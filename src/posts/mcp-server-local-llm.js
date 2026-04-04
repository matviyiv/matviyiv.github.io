import React from 'react';

function McpServerLocalLlm() {
  return (
    <>
      <p className="text-xl text-slate-400 leading-relaxed mb-8">
        I recently built my first Model Context Protocol (MCP) server, running completely offline with a local LLM.
        Here's my journey following the Anthropic workshop but taking it fully local, with Redis storage, LMStudio,
        and some hard-learned lessons about M2 Mac performance tuning.
      </p>

      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6 mb-8">
        <p className="text-cyan-300 font-semibold mb-2">🔗 GitHub Repository</p>
        <a
          href="https://github.com/matviyiv/my-first-mcp-server"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline text-lg"
        >
          github.com/matviyiv/my-first-mcp-server
        </a>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">What is MCP?</h2>
      <p className="mb-6">
        Model Context Protocol (MCP) is Anthropic's open protocol that standardizes how applications provide context to LLMs.
        Think of it as a universal adapter - instead of building custom integrations for each tool and model,
        MCP provides a standard interface that any LLM can use to interact with various data sources and tools.
      </p>

      <p className="mb-6">
        The beauty of MCP is its flexibility. While Anthropic designed it for Claude, it works with any LLM that can
        follow the protocol - including local models running on your own hardware.
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">The Local Setup Journey</h2>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">Following the Workshop (But Offline)</h3>
      <p className="mb-6">
        I started with Anthropic's MCP workshop, but with a twist - everything had to run locally. No cloud services,
        no API calls, complete privacy. Here's what my stack looks like:
      </p>

      <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 mb-8">
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <div>
              <strong className="text-cyan-300">MCP Server:</strong> JavaScript/Node.js
              <span className="text-slate-400 text-sm block mt-1">Chose JS for rapid development and npm ecosystem</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <div>
              <strong className="text-cyan-300">Storage:</strong> Redis in Docker
              <span className="text-slate-400 text-sm block mt-1">Fast, simple, perfect for MCP context caching</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <div>
              <strong className="text-cyan-300">LLM:</strong> Qwen 3.5 35B (A3B quantization) via LMStudio
              <span className="text-slate-400 text-sm block mt-1">Powerful reasoning, runs well on Apple Silicon</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <div>
              <strong className="text-cyan-300">IDE Integration:</strong> OpenCode VS extension
              <span className="text-slate-400 text-sm block mt-1">Connects LMStudio to VS Code seamlessly</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">▹</span>
            <div>
              <strong className="text-cyan-300">Hardware:</strong> M2 Mac, 64GB RAM
              <span className="text-slate-400 text-sm block mt-1">Needed every byte for the 35B model</span>
            </div>
          </li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Architecture Overview</h2>
      <p className="mb-6">
        Everything runs on localhost. No internet required once you have the model downloaded:
      </p>

      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-8 mb-8 font-mono text-sm">
        <pre className="text-blue-300 whitespace-pre-wrap">
{`┌─────────────────────┐
│   VS Code + OpenCode│
└──────────┬──────────┘
           │ MCP Protocol
┌──────────▼──────────┐
│  MCP Server (Node)  │ ← My Implementation
├─────────────────────┤
│  Redis (Docker)     │ ← Context Storage
└──────────┬──────────┘
           │ OpenAI-compatible API
┌──────────▼──────────┐
│  LMStudio           │
│  Qwen 3.5 35B (A3B) │ ← Local LLM
└─────────────────────┘

Everything on localhost:
- MCP Server: http://localhost:3000
- Redis: localhost:6379
- LMStudio: http://localhost:1234`}
        </pre>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Implementation Details</h2>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">Setting Up Redis Storage</h3>
      <p className="mb-6">
        First, I spun up Redis in Docker for MCP context storage:
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <pre className="text-sm">
          <code className="text-green-400 font-mono">
{`# Docker Compose for Redis
docker run -d \\
  --name mcp-redis \\
  -p 6379:6379 \\
  redis:alpine

# Verify it's running
redis-cli ping
# Output: PONG`}
          </code>
        </pre>
      </div>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">Node.js MCP Server</h3>
      <p className="mb-6">
        Here's a simplified version of my MCP server implementation:
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <pre className="text-sm">
          <code className="text-slate-300">
{`import { MCPServer } from '@anthropic-ai/sdk';
import { createClient } from 'redis';
import express from 'express';

const app = express();
const redis = createClient({ url: 'redis://localhost:6379' });
await redis.connect();

const mcp = new MCPServer({
  storage: redis,
  tools: {
    // Define your tools here
    readFile: async (path) => {
      const content = await fs.readFile(path, 'utf-8');
      return content;
    },
    searchCode: async (query) => {
      // Implement code search logic
    }
  }
});

app.post('/mcp', async (req, res) => {
  const result = await mcp.handleRequest(req.body);
  res.json(result);
});

app.listen(3000, () => {
  console.log('MCP server running on localhost:3000');
});`}
          </code>
        </pre>
      </div>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">Connecting to LMStudio</h3>
      <p className="mb-6">
        LMStudio provides an OpenAI-compatible API endpoint, making it easy to integrate:
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
        <pre className="text-sm">
          <code className="text-slate-300">
{`// In your MCP server
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'http://localhost:1234/v1',
  apiKey: 'not-needed-for-local'
});

async function queryLLM(prompt, context) {
  const response = await client.chat.completions.create({
    model: 'qwen3.5-35b-a3b',
    messages: [
      { role: 'system', content: context },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 4096
  });

  return response.choices[0].message.content;
}`}
          </code>
        </pre>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Performance Tuning (The Hard Way)</h2>

      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-8">
        <p className="text-red-300 font-semibold mb-3">⚠️ Overheating Warning!</p>
        <p className="text-slate-300">
          Running a 35B parameter model with full context on an M2 Mac will turn it into a space heater.
          I learned this the hard way when my Mac throttled down to unusable speeds.
        </p>
      </div>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">Memory Optimization</h3>
      <p className="mb-6">
        Even with 64GB RAM, I had to tune LMStudio settings carefully:
      </p>

      <div className="space-y-4 mb-8">
        <div className="border-l-4 border-cyan-500 pl-6 py-2">
          <h4 className="font-semibold text-cyan-300 mb-2">Context Length: Limited to 50,000 tokens</h4>
          <p className="text-slate-300">
            Originally tried 128k context. Bad idea. Cut it down to 50k to prevent memory exhaustion.
            Still plenty for most coding tasks.
          </p>
        </div>

        <div className="border-l-4 border-blue-500 pl-6 py-2">
          <h4 className="font-semibold text-blue-300 mb-2">KV Cache: Disabled</h4>
          <p className="text-slate-300">
            Disabling KV cache reduced memory usage by ~50%. Slight speed trade-off, but kept RAM usage
            under control and prevented thermal throttling.
          </p>
        </div>

        <div className="border-l-4 border-purple-500 pl-6 py-2">
          <h4 className="font-semibold text-purple-300 mb-2">GPU Offload: 100%</h4>
          <p className="text-slate-300">
            Full GPU offload on M2's unified memory architecture. Let the GPU cores do the heavy lifting
            while keeping the CPU cool.
          </p>
        </div>

        <div className="border-l-4 border-pink-500 pl-6 py-2">
          <h4 className="font-semibold text-pink-300 mb-2">Temperature Monitoring</h4>
          <p className="text-slate-300">
            Keep an eye on system temps. If it goes above 90°C, reduce context length further or
            lower the batch size.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">LMStudio Configuration</h3>
      <p className="mb-6">
        My final LMStudio settings that work reliably:
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8">
        <pre className="text-sm text-slate-300">
{`Model: qwen/qwen3.5-35b-a3b
Context Length: 50000
GPU Offload: 100% (41 layers)
KV Cache: Disabled
Temperature: 0.7
Top P: 0.9
Batch Size: 512
Threads: 8 (on M2 Max 12-core CPU)

Memory Usage:
- Model: ~20GB
- Context: ~8GB
- System: ~4GB
Total: ~32GB (leaves plenty of headroom)`}
        </pre>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Why Fully Local?</h2>

      <div className="space-y-4 mb-8">
        <div className="glass-card p-6">
          <h4 className="text-xl font-semibold text-purple-400 mb-3">Privacy First</h4>
          <p className="text-slate-300">
            Your code never leaves your machine. Perfect for proprietary projects or sensitive work.
            No API keys, no data sharing, complete control.
          </p>
        </div>

        <div className="glass-card p-6">
          <h4 className="text-xl font-semibold text-purple-400 mb-3">Zero Cost</h4>
          <p className="text-slate-300">
            No API fees. Run as many queries as you want. The only cost is electricity
            (and maybe your Mac's fan noise 😄).
          </p>
        </div>

        <div className="glass-card p-6">
          <h4 className="text-xl font-semibold text-purple-400 mb-3">Offline Capability</h4>
          <p className="text-slate-300">
            Works on planes, in coffee shops with bad WiFi, anywhere. Once set up,
            it's completely independent of internet connectivity.
          </p>
        </div>

        <div className="glass-card p-6">
          <h4 className="text-xl font-semibold text-purple-400 mb-3">Learning Experience</h4>
          <p className="text-slate-300">
            Building from scratch teaches you how MCP actually works under the hood.
            You understand every piece of the stack.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Real-World Usage</h2>
      <p className="mb-6">
        After tuning, the setup works remarkably well for daily development:
      </p>

      <ul className="list-disc list-inside mb-8 space-y-2 text-slate-300 ml-4">
        <li>Code completion feels snappy (1-2 second latency)</li>
        <li>Context-aware suggestions based on entire project</li>
        <li>Refactoring assistance across multiple files</li>
        <li>Redis caching makes repeated queries instant</li>
        <li>No internet = no distractions when coding</li>
      </ul>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Lessons Learned</h2>

      <div className="space-y-4 mb-8">
        <div className="border-l-4 border-cyan-500 pl-6 py-2">
          <h4 className="font-semibold text-cyan-300 mb-2">Start Small</h4>
          <p className="text-slate-300">
            Don't jump to 128k context immediately. Start with 16k, then 32k, then 50k.
            Find your sweet spot.
          </p>
        </div>

        <div className="border-l-4 border-blue-500 pl-6 py-2">
          <h4 className="font-semibold text-blue-300 mb-2">Monitor Everything</h4>
          <p className="text-slate-300">
            Use Activity Monitor (Mac) or similar to watch CPU, GPU, and RAM usage.
            Thermal throttling kills performance.
          </p>
        </div>

        <div className="border-l-4 border-purple-500 pl-6 py-2">
          <h4 className="font-semibold text-purple-300 mb-2">Redis is Your Friend</h4>
          <p className="text-slate-300">
            Caching context and results in Redis made a huge difference in responsiveness.
            Don't skip this step.
          </p>
        </div>

        <div className="border-l-4 border-pink-500 pl-6 py-2">
          <h4 className="font-semibold text-pink-300 mb-2">JavaScript Works Great</h4>
          <p className="text-slate-300">
            You don't need Python. Node.js works perfectly for MCP servers, and the
            npm ecosystem has everything you need.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 mt-12 mb-6">Conclusion</h2>
      <p className="mb-6">
        Building a fully local MCP server was more challenging than using cloud APIs, but the benefits
        are worth it. Complete privacy, zero ongoing costs, offline capability, and deep understanding
        of how everything works.
      </p>

      <p className="mb-6">
        The key is finding the right balance of model size, context length, and system resources.
        A 35B model on 64GB RAM is pushing it, but with careful tuning (50k context, no KV cache,
        full GPU offload), it works reliably for daily development.
      </p>

      <p className="mb-6">
        If you have an M2 or M3 Mac with decent RAM, I highly recommend trying this setup.
        Start with a smaller model (7B or 13B) if you're new to local LLMs, then work your way up.
      </p>

      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-8 mt-12">
        <h3 className="text-xl font-bold text-cyan-300 mb-4">Try It Yourself!</h3>
        <p className="text-slate-300 text-lg mb-4">
          Check out my full implementation on GitHub:
        </p>
        <a
          href="https://github.com/matviyiv/my-first-mcp-server"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
        >
          View on GitHub →
        </a>
        <p className="text-slate-400 text-sm mt-4">
          Star the repo if you found it helpful! Feel free to open issues or PRs.
        </p>
      </div>
    </>
  );
}

export default McpServerLocalLlm;

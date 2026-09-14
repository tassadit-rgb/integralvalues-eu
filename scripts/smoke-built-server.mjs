import { spawn } from "node:child_process";

const port = "4317";
const origin = `http://127.0.0.1:${port}`;
const server = spawn("bun", ["run", "start"], {
  env: { ...process.env, PORT: port, HOST: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
server.stdout.on("data", (chunk) => { output += chunk; });
server.stderr.on("data", (chunk) => { output += chunk; });

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.status < 500) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Built server did not start.\n${output}`);
}

try {
  await waitForServer();
  for (const pathname of ["/", "/booking", "/route-that-does-not-exist"]) {
    const response = await fetch(origin + pathname, { redirect: "manual" });
    const body = await response.text();
    if (response.status >= 500 || !body.toLowerCase().includes("<html")) {
      throw new Error(
        `${pathname} returned ${response.status} without a valid HTML document`,
      );
    }
  }
  console.log("Built server smoke test passed.");
} finally {
  server.kill("SIGTERM");
}

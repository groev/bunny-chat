import { type Serve, type BunFile } from "bun";

// Define our configuration shape
interface ServerConfig {
  port: number;
  staticDir: string;
  entryPoint: string;
}

const config: ServerConfig = {
  port: Number(process.env.PORT) || 8080,
  staticDir: "./dist",
  entryPoint: "./dist/index.html",
};

const server = Bun.serve({
  port: config.port,
  async fetch(req: Request) {
    const url = new URL(req.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;

    const file: BunFile = Bun.file(`${config.staticDir}${path}`);

    if (await file.exists()) {
      return new Response(file);
    }

    const index: BunFile = Bun.file(config.entryPoint);
    if (await index.exists()) {
      return new Response(index);
    }

    return new Response("Not Found", { status: 404 });
  },
  error(error: Error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: { "Content-Type": "text/html" },
    });
  },
});

console.log(`🚀 Client serving at http://localhost:${server.port}`);

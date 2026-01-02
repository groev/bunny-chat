import { Controller } from "@/util/types";
import { auth } from "./service";

export const authController: Controller = {
  handleRequest: async (request, reply) => {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        ...(request.body ? { body: JSON.stringify(request.body) } : {}),
      });
      const response = await auth.handler(req);
      reply.status(response.status);
      const responseHeaders = response.headers as Headers;
      responseHeaders.forEach((value, key) => reply.header(key, value));
      reply.send(response.body ? await response.text() : null);
    } catch (error) {
      if (error instanceof Error) {
        request.log.error("Authentication Error: " + error.message);
      } else {
        console.error("Unknown error:", error);
      }
      reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE",
      });
    }
  },
};

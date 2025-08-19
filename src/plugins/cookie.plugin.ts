import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import fCookie from "@fastify/cookie";
import fp from "fastify-plugin";
import { success } from "zod";
import type { FastifyJWT } from "@fastify/jwt";
import { request } from "http";

const cookiePlugin = async (fastify: FastifyInstance) => {
  await fastify.register(fCookie, {
    secret: process.env.COOKIE_SECRET_KEY?.toString() ?? "secret",
    hook: "preHandler",
  });

  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const token = req.cookies.access_token;

        if (!token) {
          return reply.status(401).send({
            success: false,
            data: null,
            message: "Unauthorized",
          });
        }

        const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
        req.user = decoded;
      } catch (err) {
        return reply.status(401).send({
          success: false,
          data: null,
          message: "Invalid token",
        });
      }
    },
  );

  fastify.addHook(
    "preHandler",
    (
      request: FastifyRequest,
      reply: FastifyReply,
      next: HookHandlerDoneFunction,
    ) => {
      request.jwt = fastify.jwt;
      return next();
    },
  );
};

export default fp(cookiePlugin);

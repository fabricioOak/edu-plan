import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import fp from "fastify-plugin";

const jwtPlugin = async (fastify: FastifyInstance) => {
  await fastify.register(fjwt, {
    secret: process.env.JWT_SECRET_KEY?.toString() ?? "secret",
  });
};

export default fp(jwtPlugin);

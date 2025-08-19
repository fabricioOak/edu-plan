import fastify from "fastify";
import swaggerPlugin from "@/plugins/swagger.plugin";

const server = fastify();

server.register(swaggerPlugin);

export { server };

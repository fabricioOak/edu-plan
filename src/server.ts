import fastify from "fastify";
import swaggerPlugin from "@/plugins/swagger.plugin";
import jwtPlugin from "@/plugins/jwt.plugin";
import cookiePlugin from "@/plugins/cookie.plugin";

const server = fastify();

server.register(swaggerPlugin);
server.register(jwtPlugin);
server.register(cookiePlugin);

export { server };

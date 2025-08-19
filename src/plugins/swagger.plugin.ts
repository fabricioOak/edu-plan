import fastifySwagger from "@fastify/swagger";
import {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
  type HookHandlerDoneFunction,
} from "fastify";
import fp from "fastify-plugin";
import apiReferenceConfiguration from "@scalar/fastify-api-reference";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import routes from "@/routes";

const swaggerPlugin = async (fastify: FastifyInstance) => {
  await fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Edu-Plan API",
        description:
          "Welcome to Edu-Plan! On this documentation, we'll share a deep view of our API. Throughout the documentation, we'll provide examples and code snippets to help you understand how our API works.",
        version: "1.0.0",
      },
      host: "localhost:3333",
      schemes: process.env.NODE_ENV === "development" ? ["http"] : ["https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        authenticate: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "JWT token for authentication",
        },
      },
      tags: [], // TODO: Add tags based on enums
    },
  });

  await fastify.register(apiReferenceConfiguration, {
    routePrefix: "/docs",
    hooks: {
      onRequest: function (
        request: FastifyRequest,
        reply: FastifyReply,
        next: HookHandlerDoneFunction,
      ) {
        next();
      },
      preHandler: function (
        request: FastifyRequest,
        reply: FastifyReply,
        next: HookHandlerDoneFunction,
      ) {
        next();
      },
    },
  });

  fastify.withTypeProvider<ZodTypeProvider>();
  fastify.setSerializerCompiler(serializerCompiler);
  fastify.setValidatorCompiler(validatorCompiler);

  fastify.register(routes, { prefix: "/api" });
};

export default fp(swaggerPlugin, { name: "swagger" });

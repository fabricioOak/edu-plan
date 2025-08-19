import type { JWT } from "@fastify/jwt";
import { EUserRoles } from "../enums/user.ts";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
    user: UserPayload;
  }

  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

type UserPayload = {
  id: string;
  email: string;
  name: string;
  role: EUserRoles;
  isVerified: boolean;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload;
  }
}

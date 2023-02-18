import { z } from "zod";

const reqUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

const userSchema = reqUserSchema.extend({
  id: z.number(),
});

const resUserSchema = userSchema.omit({ password: true, id: true });
const resUserSchemaWithoutPassword = userSchema.omit({ password: true });

export {
  reqUserSchema,
  userSchema,
  resUserSchema,
  resUserSchemaWithoutPassword,
};

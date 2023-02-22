import { hashSync } from "bcryptjs";
import { z } from "zod";

const reqUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().transform((password) => {
    return hashSync(password, 10);
  }),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

const userSchema = reqUserSchema.extend({
  id: z.number(),
});

const resUserSchemaWithoutPassword = userSchema.omit({ password: true });

const updateUserSchema = userSchema.omit({
  id: true,
  admin: true,
  active: true,
});

export {
  reqUserSchema,
  userSchema,
  resUserSchemaWithoutPassword,
  updateUserSchema,
};

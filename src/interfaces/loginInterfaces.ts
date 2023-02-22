import { loginSchema } from "../schemas/loginSchemas";
import { z } from "zod";

type iLoginReq = z.infer<typeof loginSchema>;

export { iLoginReq };

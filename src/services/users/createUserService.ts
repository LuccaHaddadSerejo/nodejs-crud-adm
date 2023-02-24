import {
  iUserReq,
  userQueryRes,
  userWithoutPassword,
} from "../../interfaces/usersInterfaces";
import { client } from "../../database";
import format from "pg-format";
import { resUserSchemaWithoutPassword } from "../../schemas/usersSchemas";

const createUserService = async (
  data: iUserReq
): Promise<userWithoutPassword> => {
  const queryString = format(
    `
            INSERT INTO
                users (%I)
            VALUES 
                (%L)
            RETURNING *;
   `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: userQueryRes = await client.query(queryString);

  return resUserSchemaWithoutPassword.parse(queryResult.rows[0]);
};

export default createUserService;

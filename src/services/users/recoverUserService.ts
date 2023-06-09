import { QueryConfig } from "pg";
import { client } from "../../database";
import {
  userQueryRes,
  userWithoutPassword,
} from "../../interfaces/usersInterfaces";
import { resUserSchemaWithoutPassword } from "../../schemas/usersSchemas";

const recoverUserService = async (id: number): Promise<userWithoutPassword> => {
  const queryString: string = `
        UPDATE 
            users 
        SET
            active = true
        WHERE 
            id = $1
        RETURNING *;
      `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: userQueryRes = await client.query(queryConfig);

  return resUserSchemaWithoutPassword.parse(queryResult.rows[0]);
};

export default recoverUserService;

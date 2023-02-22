import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { iUserReq, userQueryRes } from "../../interfaces/usersInterfaces";
import { updateUserSchema } from "../../schemas/usersSchemas";

const updateLoggedUser = async (data: iUserReq, id: number): Promise<any> => {
  let queryString: string = `
        SELECT 
            *
        FROM
            users
        WHERE
            id = $1
      `;

  let queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  let queryResult: userQueryRes = await client.query(queryConfig);

  queryString = format(
    `
        UPDATE 
            users
        SET (%I) = ROW(%L)
        WHERE 
            id = $1
        RETURNING *;
      `,
    Object.keys(data),
    Object.values(data)
  );

  queryConfig = {
    text: queryString,
    values: [id],
  };

  queryResult = await client.query(queryConfig);

  return updateUserSchema.parse(queryResult.rows[0]);
};

export default updateLoggedUser;

import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { iUserReq, userQueryRes } from "../../interfaces/usersInterfaces";

const deleteUserService = async (data: iUserReq, id: number): Promise<void> => {
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
        SET
            active = false
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

  await client.query(queryConfig);
};

export default deleteUserService;

import { QueryConfig } from "pg";
import { client } from "../../database";
import { iUser, userQueryRes } from "../../interfaces/usersInterfaces";

const getLoggedUserService = async (data: number): Promise<iUser> => {
  const id: number = data;

  const queryString = `
        SELECT
            *
        FROM 
            users
        WHERE
            id = $1;
   `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: userQueryRes = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default getLoggedUserService;

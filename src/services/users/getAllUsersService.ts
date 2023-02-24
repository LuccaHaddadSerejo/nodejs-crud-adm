import {
  userQueryResWithoutPassword,
  usersList,
} from "../../interfaces/usersInterfaces";
import { client } from "../../database";

const listAllUsersService = async (): Promise<usersList> => {
  const queryString = `
        SELECT
            id, name, email, admin, active
        FROM 
            users;
   `;

  const queryResult: userQueryResWithoutPassword = await client.query(
    queryString
  );

  return queryResult.rows;
};

export default listAllUsersService;

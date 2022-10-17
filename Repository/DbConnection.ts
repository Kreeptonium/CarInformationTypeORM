import { Connection, createConnection } from "typeorm";

export const DbConnection = ():Promise<Connection>=>{

    try {
        
        return createConnection();

    } catch (error) {
        throw new Error(error);
    }

}
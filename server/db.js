import {Pool} from "pg";

export const pool = new Pool({

    user: "postgres" ,
    password : "prajwal478",
    host: "localhost",
    port: 5432,
    database: "perntodo",

});


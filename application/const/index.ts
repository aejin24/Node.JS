import { StringOrNumber } from "customTypes/union";
import { AuthData } from "interfaces/const";

import path from "path";

export const PORT: StringOrNumber = process.env.PORT || 3000;

export const authData: AuthData = {
    email: "test@test.com",
    password: "1224"
}

export const staticDataPath: string = path.join(__dirname, "..", "public\\data.txt");
import { randomBytes, createHmac } from "crypto";

const SECRET = 'BACKEND-WITH-TS';

export const random = () => randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

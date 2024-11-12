import { EnvironmentType, Environment } from "./environment";
import * as path from "path";

export default function () {
  const envFile: EnvironmentType =
    process.env.NODE_ENV === "production"
      ? Environment.Production
      : Environment.Development;
  return {
    dotenv: {
      path: path.resolve(__dirname, `../../../${envFile}`),
      debug: true,
    },
    schema: {
      type: "object",
      required: ["DB_URI", "JWT_SECRET", "LOG_FILE_PATH"],
      properties: {
        DB_URI: { type: "string" },
        JWT_SECRET: { type: "string" },
        LOG_FILE_PATH: { type: "string" },
      },
    },
  };
}

export interface ConfigType {
  DB_URI: string;
  JWT_SECRET: string;
  LOG_FILE_PATH: string;
}

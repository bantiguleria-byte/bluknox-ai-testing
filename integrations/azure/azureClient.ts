import * as azdev from "azure-devops-node-api";
import dotenv from "dotenv";

dotenv.config();

const orgUrl = process.env.AZURE_ORG_URL!;
const token = process.env.AZURE_PAT!;

const authHandler = azdev.getPersonalAccessTokenHandler(token);

export const connection = new azdev.WebApi(
  orgUrl,
  authHandler
);
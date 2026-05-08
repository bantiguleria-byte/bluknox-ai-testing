import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const jiraClient = axios.create({
  baseURL: process.env.JIRA_BASE_URL,
  auth: {
    username: process.env.JIRA_EMAIL!,
    password: process.env.JIRA_API_TOKEN!,
  },
  headers: {
    "Content-Type": "application/json",
  },
});
import { connection } from "./integrations/azure/azureClient";

async function test() {
  try {
    const coreApi = await connection.getCoreApi();
    const projects = await coreApi.getProjects();

    console.log("Azure Connected Successfully!");
    console.log(projects);
  } catch (error) {
    console.error("Azure Connection Failed");
    console.error(error);
  }
}

test();
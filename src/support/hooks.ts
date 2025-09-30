import { Before, After } from "@cucumber/cucumber";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {
  await this.apiClient.init();
});

After(async function (this: CustomWorld) {
  await this.apiClient.dispose();
});

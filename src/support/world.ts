import { setWorldConstructor } from "@cucumber/cucumber";
import { ApiClient } from "./apiClient";
import { APIResponse } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const LAST_ID_FILE = path.join("reports", "lastId.json");

export class CustomWorld {
  apiClient: ApiClient;
  response!: APIResponse;
  lastId?: string;

  constructor() {
    this.apiClient = new ApiClient();

    if (fs.existsSync(LAST_ID_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(LAST_ID_FILE, "utf-8"));
        if (data.lastId) {
          this.lastId = data.lastId;
          //console.log(`lastId loaded from file: ${this.lastId}`);
        }
      } catch (err) {
        //console.error("Could not read lastId.json", err);
        this.lastId = undefined;
      }
    }
  }

  saveLastId(id: string) {
    this.lastId = id;
    fs.mkdirSync(path.dirname(LAST_ID_FILE), { recursive: true });
    fs.writeFileSync(LAST_ID_FILE, JSON.stringify({ lastId: id }, null, 2));
    //console.log(`lastId saved to file: ${id}`);
  }
}

setWorldConstructor(CustomWorld);

import { When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { CustomWorld } from "../support/world";

// Replace ${id} with lastId
function resolveEndpoint(world: CustomWorld, endpoint: string): string {
  return endpoint.replace("${id}", world.lastId || "");
}

// POST
When(
  "I send a POST request to {string} with body:",
  async function (this: CustomWorld, endpoint: string, body: string) {
    const payload = JSON.parse(body);
    this.response = await this.apiClient.post(resolveEndpoint(this, endpoint), payload);
  }
);

// GET
When(
  "I send a GET request to {string}",
  async function (this: CustomWorld, endpoint: string) {
    this.response = await this.apiClient.get(resolveEndpoint(this, endpoint));
  }
);

// PUT
When(
  "I send a PUT request to {string} with body:",
  async function (this: CustomWorld, endpoint: string, body: string) {
    const payload = JSON.parse(body);
    this.response = await this.apiClient.put(resolveEndpoint(this, endpoint), payload);
  }
);

// DELETE
When(
  "I send a DELETE request to {string}",
  async function (this: CustomWorld, endpoint: string) {
    this.response = await this.apiClient.delete(resolveEndpoint(this, endpoint));
  }
);

// Status check
Then(
  "the response status should be {int}",
  async function (this: CustomWorld, statusCode: number) {
    expect(this.response.status()).to.equal(statusCode);
  }
);

// Contain string
Then(
  "the response should contain {string}",
  async function (this: CustomWorld, expected: string) {
    const text = JSON.stringify(await this.response.json());
    expect(text).to.include(expected);
  }
);

Then(
  "the response should contain a list of objects",
   async function (this: CustomWorld) {
    const json = await this.response.json();
    expect(json).to.be.an("array");
    expect(json.length).to.be.greaterThan(0);
  }
);

// Save field (id)
Then(
  "I save the {string} from the response",
  async function (this: CustomWorld, field: string) {
    const json = await this.response.json();
    //console.log("Full response JSON:", JSON.stringify(json, null, 2));

    let value: any;

    // soportar niveles anidados tipo "data.id"
    if (field.includes(".")) {
      value = field.split(".").reduce((obj, key) => obj?.[key], json);
    } else {
      value = json[field];
    }

    if (!value) {
      throw new Error(`❌ Field "${field}" not found in response: ${JSON.stringify(json)}`);
    }

    this.saveLastId(value);
  }
);
import { request, APIRequestContext, APIResponse } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "https://api.restful-api.dev";

export class ApiClient {
  private context!: APIRequestContext;

  async init() {
    this.context = await request.newContext({ baseURL: BASE_URL });
  }

  async get(path: string): Promise<APIResponse> {
    return this.context.get(path);
  }

  async post(path: string, data: any): Promise<APIResponse> {
    return this.context.post(path, { data });
  }

  async put(path: string, data: any): Promise<APIResponse> {
    return this.context.put(path, { data });
  }

  async delete(path: string): Promise<APIResponse> {
    return this.context.delete(path);
  }

  async dispose() {
    await this.context.dispose();
  }
}

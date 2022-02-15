import waitForExpect from "wait-for-expect";
import { createRunner } from "./_shared.js";

let runner;

beforeAll(() => {
  runner = createRunner("launch");
});

afterAll(async () => {
  await runner.kill();
});

test("launch", async () => {
  await waitForExpect(() => {
    expect(runner.succeeded).toBe(true);
  });
});

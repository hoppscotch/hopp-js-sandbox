import { execTestScript, TestDescriptor } from "./test-runner";

export async function runTestScript(testScript: string): Promise<TestDescriptor> {
  return (await execTestScript(testScript))[0];
}

(async () => {
console.dir(
  await runTestScript(
    `
    pw.test("Arithmetic operations", () => {
      const size = 500 + 500;
      pw.expect(size).toBe(1000);
      pw.expect(size - 500).toBe(500);
      pw.expect(size * 4).toBe(4000);
      pw.expect(size / 4).toBe(250);
    });
    `
  ), {
    depth: 100
  }
)
})()
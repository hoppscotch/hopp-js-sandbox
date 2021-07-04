import { execTestScript, TestDescriptor } from "./test-runner"

/**
 * Executes a given test script on the test-runner sandbox
 * @param testScript The string of the script to run
 * @returns A promise to a TestDescriptor with the final status
 */
export async function runTestScript(
  testScript: string
): Promise<TestDescriptor> {
  return (await execTestScript(testScript))[0]
}

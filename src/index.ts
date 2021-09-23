import { pipe } from "fp-ts/lib/function"
import { chain, right } from "fp-ts/lib/TaskEither"
import { execTestScript, TestResponse } from "./test-runner"

/**
 * Executes a given test script on the test-runner sandbox
 * @param testScript The string of the script to run
 * @returns A TaskEither with an error message or a TestDescriptor with the final status
 */
export const runTestScript = (
  testScript: string,
  response: TestResponse
) => pipe(
  execTestScript(testScript, response),
  chain((results) => right(results[0])) // execTestScript returns an array of descriptors with a single element (extract that)
)
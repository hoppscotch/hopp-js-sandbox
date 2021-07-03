import { execTestScript } from "../../../test-runner"

describe("toBeType", () => {
  test("asserts true for valid type expectations with no negation", () => {
    return expect(
      execTestScript(
        `
          pw.expect(2).toBeType("number")
          pw.expect("2").toBeType("string")
          pw.expect(true).toBeType("boolean")
          pw.expect({}).toBeType("object")
          pw.expect(undefined).toBeType("undefined")
        `
      )
    ).resolves.toEqual([
      expect.objectContaining({
        expectResults: [true, true, true, true, true],
      }),
    ])
  })

  test("asserts false for invalid type expectations with no negation", () => {
    return expect(
      execTestScript(
        `
          pw.expect(2).toBeType("string")
          pw.expect("2").toBeType("number")
          pw.expect(true).toBeType("string")
          pw.expect({}).toBeType("number")
          pw.expect(undefined).toBeType("number")
        `
      )
    ).resolves.toEqual([
      expect.objectContaining({
        expectResults: [false, false, false, false, false],
      }),
    ])
  })

  test("asserts false for valid type expectations with negation", () => {
    return expect(
      execTestScript(
        `
          pw.expect(2).not.toBeType("number")
          pw.expect("2").not.toBeType("string")
          pw.expect(true).not.toBeType("boolean")
          pw.expect({}).not.toBeType("object")
          pw.expect(undefined).not.toBeType("undefined")
        `
      )
    ).resolves.toEqual([
      expect.objectContaining({
        expectResults: [false, false, false, false, false],
      }),
    ])
  })

  test("asserts true for invalid type expectations with negation", () => {
    return expect(
      execTestScript(
        `
          pw.expect(2).not.toBeType("string")
          pw.expect("2").not.toBeType("number")
          pw.expect(true).not.toBeType("string")
          pw.expect({}).not.toBeType("number")
          pw.expect(undefined).not.toBeType("number")
        `
      )
    ).resolves.toEqual([
      expect.objectContaining({
        expectResults: [true, true, true, true, true],
      }),
    ])
  })
})

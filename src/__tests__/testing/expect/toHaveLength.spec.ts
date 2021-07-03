import { execTestScript } from "../../../test-runner"

describe("toHaveLength", () => {
  test("asserts true for valid lengths with no negation", () => {
    return expect(
      execTestScript(
        `
          pw.expect([1, 2, 3, 4]).toHaveLength(4)
          pw.expect([]).toHaveLength(0)
        `
      )
    ).resolves.toEqual([
      expect.objectContaining({
        expectResults: [true, true],
      }),
    ])
  })

  test("asserts false for invalid lengths with no negation", () => {
    return expect(
      execTestScript(
        `
          pw.expect([]).toHaveLength(4)
          pw.expect([1, 2, 3, 4]).toHaveLength(0)
        `
      )
    ).resolves.toEqual([
      expect.objectContaining({
        expectResults: [false, false],
      }),
    ])
  })

  test("asserts false for valid lengths with negation", () => {
    return expect(
      execTestScript(
        `
          pw.expect([1, 2, 3, 4]).not.toHaveLength(4)
          pw.expect([]).not.toHaveLength(0)
        `
      )
    ).resolves.toEqual([
      expect.objectContaining({
        expectResults: [false, false],
      }),
    ])
  })

  test("asserts true for invalid lengths with negation", () => {
    return expect(
      execTestScript(
        `
          pw.expect([]).not.toHaveLength(4)
          pw.expect([1, 2, 3, 4]).not.toHaveLength(0)
        `
      )
    ).resolves.toEqual([
      expect.objectContaining({
        expectResults: [true, true],
      }),
    ])
  })
})

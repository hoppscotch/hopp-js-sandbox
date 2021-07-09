import { execTestScript } from "../../../test-runner"

describe("toBe", () => {
  describe("general assertion (no negation)", () => {
    test("expect equals expected passes assertion", () => {
      return expect(
        execTestScript(
          `
              pw.expect(2).toBe(2)
            `
        )
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [{ status: "pass" }],
        }),
      ])
    })

    test("expect not equals expected fails assertion", () => {
      return expect(
        execTestScript(
          `
              pw.expect(2).toBe(4)
            `
        )
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [{ status: "fail", message: "Expected '2' to be '4'" }],
        }),
      ])
    })
  })

  describe("general assertion (with negation)", () => {
    test("expect equals expected fails assertion", () => {
      return expect(
        execTestScript(
          `
              pw.expect(2).not.toBe(2)
            `
        )
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [{
            status: "fail",
            message: "Expected '2' to not be '2'",
          }],
        }),
      ])
    })

    test("expect not equals expected passes assertion", () => {
      return expect(
        execTestScript(
          `
              pw.expect(2).not.toBe(4)
            `
        )
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [{
            status: "pass",
          }],
        }),
      ])
    })
  })
})

test("strict checks types", () => {
  return expect(
    execTestScript(
      `
          pw.expect(2).toBe("2")
        `
    )
  ).resolves.toEqual([
    expect.objectContaining({
      expectResults: [{
        status: "fail",
        message: "Expected '2' to be '2'",
      }],
    }),
  ])
})

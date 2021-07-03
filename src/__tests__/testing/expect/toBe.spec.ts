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
          expectResults: [true],
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
          expectResults: [false],
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
          expectResults: [false],
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
          expectResults: [true],
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
      expectResults: [false],
    }),
  ])
})

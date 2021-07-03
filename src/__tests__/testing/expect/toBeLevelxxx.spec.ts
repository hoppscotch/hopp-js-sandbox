import { execTestScript } from "../../../test-runner"

describe("toBeLevel2xx", () => {
  test("assertion passes for 200 series with no negation", async () => {
    for (let i = 200; i < 300; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).toBeLevel2xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [true],
        }),
      ])
    }
  })

  test("assertion fails for non 200 series with no negation", async () => {
    for (let i = 300; i < 500; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).toBeLevel2xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [false],
        }),
      ])
    }
  })

  test("assertion fails for 200 series with negation", async () => {
    for (let i = 200; i < 300; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).not.toBeLevel2xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [false],
        }),
      ])
    }
  })

  test("assertion passes for non 200 series with negation", async () => {
    for (let i = 300; i < 500; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).not.toBeLevel2xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [true],
        }),
      ])
    }
  })
})

describe("toBeLevel3xx", () => {
  test("assertion passes for 300 series with no negation", async () => {
    for (let i = 300; i < 400; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).toBeLevel3xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [true],
        }),
      ])
    }
  })

  test("assertion fails for non 300 series with no negation", async () => {
    for (let i = 400; i < 500; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).toBeLevel3xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [false],
        }),
      ])
    }
  })

  test("assertion fails for 400 series with negation", async () => {
    for (let i = 300; i < 400; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).not.toBeLevel3xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [false],
        }),
      ])
    }
  })

  test("assertion passes for non 200 series with negation", async () => {
    for (let i = 400; i < 500; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).not.toBeLevel3xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [true],
        }),
      ])
    }
  })
})

describe("toBeLevel4xx", () => {
  test("assertion passes for 400 series with no negation", async () => {
    for (let i = 400; i < 500; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).toBeLevel4xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [true],
        }),
      ])
    }
  })

  test("assertion fails for non 400 series with no negation", async () => {
    for (let i = 500; i < 600; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).toBeLevel4xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [false],
        }),
      ])
    }
  })

  test("assertion fails for 400 series with negation", async () => {
    for (let i = 400; i < 500; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).not.toBeLevel4xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [false],
        }),
      ])
    }
  })

  test("assertion passes for non 400 series with negation", async () => {
    for (let i = 500; i < 600; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).not.toBeLevel4xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [true],
        }),
      ])
    }
  })
})

describe("toBeLevel5xx", () => {
  test("assertion passes for 500 series with no negation", async () => {
    for (let i = 500; i < 600; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).toBeLevel5xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [true],
        }),
      ])
    }
  })

  test("assertion fails for non 500 series with no negation", async () => {
    for (let i = 200; i < 500; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).toBeLevel5xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [false],
        }),
      ])
    }
  })

  test("assertion fails for 500 series with negation", async () => {
    for (let i = 500; i < 600; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).not.toBeLevel5xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [false],
        }),
      ])
    }
  })

  test("assertion passes for non 500 series with negation", async () => {
    for (let i = 200; i < 500; i++) {
      await expect(
        execTestScript(`pw.expect(${i}).not.toBeLevel5xx()`)
      ).resolves.toEqual([
        expect.objectContaining({
          expectResults: [true],
        }),
      ])
    }
  })
})
import { cleanup } from "@testing-library/react"

import { arrayInArrays, checkArraysEqual } from "./index"

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

it("", () => {
  expect(checkArraysEqual([1, 2], [1, 2])).toBeTruthy()
})

it("", () => {
  expect(
    arrayInArrays(
      [1, 2],
      [
        [1, 2],
        [2, 3],
      ]
    )
  ).toBeTruthy()
})

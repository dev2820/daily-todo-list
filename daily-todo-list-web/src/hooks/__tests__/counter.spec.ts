import { describe, expect, it } from "vitest";
import { useCounter } from "../counter";
import { renderHook } from "@testing-library/react-hooks";

describe("useCounter", () => {
  it("should increase value", () => {
    const { result: counter } = renderHook(() => useCounter());

    counter.current.increment();
    expect(counter.current.count).toBe(1);
  });
});

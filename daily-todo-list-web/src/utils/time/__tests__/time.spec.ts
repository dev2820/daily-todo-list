import { beforeEach, describe, expect, it, vi } from "vitest";
import { dateFormat } from "..";

describe("localStorage", () => {
  vi.setSystemTime(new Date(2023, 7, 30));
  beforeEach(() => {
    localStorage.setItem("keyName", JSON.stringify({ a: 1 }));
  });
  it("should getItem", () => {
    const dateStr = dateFormat(new Date(), "mm/dd");
    expect(dateStr).toBe("08/30");
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { getStorage } from "..";

describe("localStorage", () => {
  beforeEach(() => {
    localStorage.setItem("keyName", JSON.stringify({ a: 1 }));
  });
  it("should getItem", () => {
    const item = getStorage("local")?.getItem("keyName");
    expect(item).toEqual({ a: 1 });
  });

  it("should return null when key is not exist", () => {
    const item = getStorage("local")?.getItem("NotkeyName");
    expect(item).toBeNull();
  });

  it("should set data", () => {
    getStorage("local")?.setItem("keyName", { a: 2 });
    getStorage("local")?.setItem("keyName2", { b: 1 });

    expect(getStorage("local").getItem("keyName")).toEqual({ a: 2 });
    expect(getStorage("local").getItem("keyName2")).toEqual({ b: 1 });
  });
});

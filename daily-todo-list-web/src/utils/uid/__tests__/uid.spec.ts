import { beforeEach, describe, expect, it, vi } from "vitest";
import { uid } from "..";

describe("uid", () => {
  beforeEach(() => {
    vi.setSystemTime(0);
  });
  it("should return unique id even generate them at the same time", () => {
    /**
     * Remember, this condition is only valid when called less than 1000 times at the same time.
     * Also valid in single thread environments only.
     */
    const uid1 = uid();
    const uid2 = uid();
    const uid3 = uid();

    expect(uid1).not.toBe(uid2);
    expect(uid2).not.toBe(uid3);
    expect(uid3).not.toBe(uid1);
  });
});

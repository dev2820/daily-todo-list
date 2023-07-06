import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { useGroup } from "../group-hook";
import { useGroupBoard } from "../group-board-hook";

describe("useGroup", () => {
  it("should init from list", () => {
    const group1 = renderHook(() =>
      useGroup("group1", [{ id: "1" }, { id: "2" }])
    );
    const group2 = renderHook(() =>
      useGroup("group2", [{ id: "3" }, { id: "4" }])
    );
    const groupBoard = renderHook(() =>
      useGroupBoard([group1.result.current, group2.result.current])
    );

    act(() =>
      groupBoard.result.current.move({
        fromGroupId: "group1",
        fromIndex: 1,
        toGroupId: "group2",
        toIndex: 2,
      })
    );

    expect(group1.result.current.items).toStrictEqual([{ id: "1" }]);
    expect(group2.result.current.items).toStrictEqual([
      { id: "3" },
      { id: "4" },
      { id: "2" },
    ]);
  });
});

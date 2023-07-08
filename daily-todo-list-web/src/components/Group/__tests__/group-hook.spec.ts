import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { useGroup } from "../group-hook";

describe("useGroup", () => {
  const item1 = { id: "1", content: "A" };
  const item2 = { id: "2", content: "A" };
  const item3 = { id: "3", content: "A" };

  it("should find index by id", () => {
    const { result } = renderHook(() =>
      useGroup("group1", [item1, item2, item3])
    );

    const index = result.current.findIndex("3");
    expect(index).toBe(2);
  });

  it("should init from list", () => {
    const { result } = renderHook(() =>
      useGroup("group1", [item1, item2, item3])
    );

    expect(result.current.items).toStrictEqual([item1, item2, item3]);
  });

  it("should be able to find item by id", () => {
    const { result } = renderHook(() =>
      useGroup("group1", [item1, item2, item3])
    );

    expect(result.current.findById("1")?.id).toBe("1");
  });

  it("should be able to find item by index", () => {
    const { result } = renderHook(() =>
      useGroup("group1", [item1, item2, item3])
    );

    expect(result.current.findByIndex(1)?.id).toBe("2");
  });

  it("should be able to insert item", () => {
    const { result } = renderHook(() =>
      useGroup("group1", [item1, item2, item3])
    );
    const newItem = { id: "4", content: "A" };
    act(() => result.current.insertItem(1, newItem));

    expect(result.current.items).toStrictEqual([item1, newItem, item2, item3]);
  });

  it("should be able to push item", () => {
    const { result } = renderHook(() =>
      useGroup("group1", [item1, item2, item3])
    );
    const newItem = { id: "4", content: "A" };
    act(() => result.current.pushItem(newItem));

    expect(result.current.items).toStrictEqual([item1, item2, item3, newItem]);
  });

  it("should be able to remove item", () => {
    const { result } = renderHook(() =>
      useGroup("group1", [item1, item2, item3])
    );

    result.current.removeItem(1);

    expect(result.current.items).toStrictEqual([item1, item3]);
  });

  it("should be able to change item", () => {
    const { result } = renderHook(() =>
      useGroup("group1", [item1, item2, item3])
    );

    result.current.changeItem(1, { content: "B" });

    expect(result.current.findByIndex(1)).toStrictEqual({
      id: "2",
      content: "B",
    });
  });
});

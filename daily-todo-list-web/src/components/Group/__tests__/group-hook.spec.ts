import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { type Identifiable } from "@/components/types";
import { useGroup } from "../group-hook";

describe("useGroup", () => {
  const item1: Identifiable = { id: "1" };
  const item2: Identifiable = { id: "2" };
  const item3: Identifiable = { id: "3" };

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
    const newItem = { id: "4" };
    act(() => result.current.insertItem(1, newItem));

    expect(result.current.items).toStrictEqual([item1, newItem, item2, item3]);
  });

  it("should be able to remove item", () => {
    const { result } = renderHook(() =>
      useGroup("group1", [item1, item2, item3])
    );

    result.current.removeItem(1);

    expect(result.current.items).toStrictEqual([item1, item3]);
  });
});

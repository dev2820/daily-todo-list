import { describe, expect, it } from "vitest";
import { useSortableList } from "..";
import { renderHook } from "@testing-library/react-hooks";

describe("useSortableList", () => {
  const items = ["A", "B", "C"];
  it("should init with list", () => {
    const { result: sortableList } = renderHook(() =>
      useSortableList<string>(items)
    );

    expect(sortableList.current.list).toEqual(["A", "B", "C"]);
  });
  it("should init with list", () => {
    const { result: sortableList } = renderHook(() =>
      useSortableList<string>()
    );
    sortableList.current.setList(["D"]);
    expect(sortableList.current.list).toEqual(["D"]);
  });
  it("should return sort handler", () => {
    const { result: sortableList } = renderHook(() =>
      useSortableList<string>(items)
    );
    sortableList.current.sort({ oldIndex: 1, newIndex: 2 });
    expect(sortableList.current.list).toEqual(["A", "C", "B"]);
  });
});

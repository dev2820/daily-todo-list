import { describe, expect, it } from "vitest";
import { useSortableList } from "..";
import { renderHook } from "@testing-library/react-hooks";

describe("useSortableList", () => {
  const items = ["A", "B", "C"];
  it("should init with list", () => {
    /**
     * list를 파라미터로 제공해 초기화할 수 있어야함
     */
    const { result: sortableList } = renderHook(() =>
      useSortableList<string>(items)
    );

    expect(sortableList.current.list).toEqual(["A", "B", "C"]);
  });
  it("should init with list", () => {
    /**
     * list를 파라미터로 제공해 초기화할 수 있어야함
     */
    const { result: sortableList } = renderHook(() =>
      useSortableList<string>()
    );
    sortableList.current.setList(["D"]);
    expect(sortableList.current.list).toEqual(["D"]);
  });
  it("should return sort handler", () => {
    /**
     * list를 정렬할 수 있는 sort 핸들러를 제공해야함
     */
    const { result: sortableList } = renderHook(() =>
      useSortableList<string>(items)
    );
    sortableList.current.sort({ oldIndex: 1, newIndex: 2 });
    expect(sortableList.current.list).toEqual(["A", "C", "B"]);
  });
});

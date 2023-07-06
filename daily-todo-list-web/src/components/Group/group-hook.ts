import { useState } from "react";
import { type Identifiable, type Id } from "@/components/types";

export const useGroup = <T extends Identifiable>(
  id: Id,
  initialItems: T[] = []
) => {
  const [items, setItems] = useState(initialItems);

  const findById = (id: Id) => items.find((item) => item.id === id);
  const findByIndex = (index: number) => items.at(index);
  const removeItem = (index: number) => {
    setItems((items: T[]) => [
      ...items.slice(0, index),
      ...items.slice(index + 1),
    ]);
  };
  const insertItem = (index: number, newItem: T) => {
    setItems((items: T[]) => [
      ...items.slice(0, index),
      newItem,
      ...items.slice(index),
    ]);
  };
  return {
    items,
    id,
    findByIndex,
    findById,
    removeItem,
    insertItem,
  };
};

export type GroupHook<T extends Identifiable> = ReturnType<typeof useGroup<T>>;

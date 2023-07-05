import { useState } from "react";

export type Id = string;
export type Identifiable = {
  id: Id;
  [key: string]: unknown;
};

export const useGroup = (initialItems: Identifiable[] = []) => {
  const [items, setItems] = useState(initialItems);

  const findById = (id: Id) => items.find((item) => item.id === id);
  const findByIndex = (index: number) => items[index];
  const removeItem = (index: number) => {
    setItems((items: Identifiable[]) => [
      ...items.slice(0, index),
      ...items.slice(index + 1),
    ]);
  };
  const insertItem = (index: number, newItem: Identifiable) => {
    setItems((items: Identifiable[]) => [
      ...items.slice(0, index),
      newItem,
      ...items.slice(index),
    ]);
  };
  return {
    items: items,
    findByIndex,
    findById,
    removeItem,
    insertItem,
  };
};

export type GroupHook = ReturnType<typeof useGroup>;

import type { Json, Storage } from "./types";

export const getLocalStorage = (): Storage => {
  const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item);
  };

  const setItem = (key: string, value: Json) =>
    localStorage.setItem(key, JSON.stringify(value));

  const removeItem = (key: string) => localStorage.removeItem(key);
  const clear = () => localStorage.clear();

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
};

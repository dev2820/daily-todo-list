import { getLocalStorage } from "./local-storage";
import { type Storage } from "./types";
/**
 * TODO:
 * 우선 LocalStorage만 지원
 * 추후 SessionStorage 등을 지원할 수 있도록 확장
 */
type StorageType = "local";

export const getStorage = (storageType: StorageType): Storage => {
  if (storageType === "local") return getLocalStorage();
  return getLocalStorage();
};

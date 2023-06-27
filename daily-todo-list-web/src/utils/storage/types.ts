export type Json = string | number | boolean | Date | JsonArray | JsonObject;

export interface JsonObject {
  [x: string]: string | number | boolean | Date | JsonObject | JsonArray;
}
export type JsonArray = Array<
  string | number | boolean | Date | JsonObject | JsonArray
>;

export interface Storage {
  getItem: (key: string) => Json | null;
  setItem: (key: string, value: Json) => void;
  removeItem: (key: string) => void;
  clear: (key: string) => void;
}

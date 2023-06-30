import { default as _dateFormat } from "dateformat";

export const ONE_DAY_MS = 86400000;

export const dateFormat = (date: Date, format: string) => {
  return _dateFormat(date, format);
};

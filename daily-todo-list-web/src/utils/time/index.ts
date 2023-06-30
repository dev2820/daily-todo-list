import { default as _dateFormat } from "dateformat";

export const dateFormat = (date: Date, format: string) => {
  return _dateFormat(date, format);
};

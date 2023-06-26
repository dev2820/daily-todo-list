import type { Meta } from "@storybook/react";

import { TodoNote } from "..";

const meta = {
  title: "Components/Todo/TodoNote",
  component: TodoNote,
} satisfies Meta<typeof TodoNote>;

export default meta;

export const Default = {
  render: () => <TodoNote className={"h-[500px]"}></TodoNote>,
};

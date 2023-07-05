import type { Meta } from "@storybook/react";

import { Board } from "..";

const meta = {
  title: "Components/Board/Board",
  component: Board,
} satisfies Meta<typeof Board>;

export default meta;

export const Default = {
  render: () => <Board></Board>,
};

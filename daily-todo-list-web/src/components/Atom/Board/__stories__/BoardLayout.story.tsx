import type { Meta } from "@storybook/react";

import { BoardLayout } from "../BoardLayout";

const meta = {
  title: "Components/Atoms/Board/BoardLayout",
  component: BoardLayout,
} satisfies Meta<typeof BoardLayout>;

export default meta;

export const Default = {
  render: () => (
    <BoardLayout>
      <div>group1</div>
      <div>group2</div>
      <div>group3</div>
      <div>group4</div>
      <div>group5</div>
      <div>group6</div>
      <div>group7</div>
      <div>group8</div>
      <div>group9</div>
    </BoardLayout>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "..";

const meta = {
  title: "Layouts/Container",
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Container>Hello World</Container>,
};

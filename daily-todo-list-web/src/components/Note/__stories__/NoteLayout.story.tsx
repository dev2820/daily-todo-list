import type { Meta } from "@storybook/react";

import { NoteLayout } from "..";

const meta = {
  title: "Components/Note/NoteLayout",
  component: NoteLayout,
} satisfies Meta<typeof NoteLayout>;

export default meta;

export const Default = {
  render: () => <NoteLayout title={"Head"}>Hello World</NoteLayout>,
};

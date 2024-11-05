import type { Meta, StoryObj } from '@storybook/react';
import UsersLayout from '../../app/(main)/layout';

const meta = {
    title: 'Layout/Users',
    component: UsersLayout,
    tags: ['autodocs'],
} satisfies Meta<typeof UsersLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        children: <>Esto es un contenido</>
    },
};

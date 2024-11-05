import type { Meta, StoryObj } from '@storybook/react';
import Message from '../../components/messages/Message';

const meta = {
    title: 'Messages/Message',
    component: Message,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        message: {
            message: "Mensaje prueba",
            name: "Anakin Skywalker",
            username: "anakin"
        },
    },
};

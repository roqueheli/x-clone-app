import type { Meta, StoryObj } from '@storybook/react';
import UserTabs from '../../components/users/UserTabs';

const meta = {
    title: 'Users/UserTabs',
    component: UserTabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UserTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const messages = [
    {
        name: "Anakin Skywalker",
        username: "anakin",
        message: "primer mensaje",
        repliesCount: 13,
    },
    {
        name: "Anakin Skywalker",
        username: "anakin",
        message: "segundo mensaje",
        repliesCount: 10,
    },
];

const replies = [
    {
        name: "Han Solo",
        username: "hsolo",
        message: "Te amo Leia",
        repliesCount: 13,
    },
    {
        name: "Anakin Skywalker",
        username: "anakin",
        message: "¿quién es mi padre?",
        repliesCount: 10,
    },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        messages: messages,
        replies: replies,
    },
};

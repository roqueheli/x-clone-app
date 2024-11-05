import type { Meta, StoryObj } from '@storybook/react';
import ExploreTrending from '../../components/explore/ExploreTrending';

const meta = {
    title: 'Explore/ExploreTrending',
    component: ExploreTrending,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ExploreTrending>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        hashes: [
            { hash: 'Tatooine', count: 2 },
            { hash: 'Fuerza', count: 1 },
        ]
    },
};

export const MoreThan2: Story = {
    args: {
        hashes: [
            { hash: 'Tatooine', count: 2 },
            { hash: 'Fuerza', count: 1 },
            { hash: 'Jedi', count: 5 }
        ]
    },
};

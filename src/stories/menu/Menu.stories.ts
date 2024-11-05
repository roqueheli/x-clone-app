import type { Meta, StoryObj } from '@storybook/react';
import Menu from '../../components/menu/Menu';

const meta = {
    title: 'Menu/Menu',
    component: Menu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        links: [
            { title: 'Inicio', href: '/' },
            { title: 'Explorar', href: '/explorar' },
            { title: 'Perfil', href: '/perfil' }
        ]
    },
};

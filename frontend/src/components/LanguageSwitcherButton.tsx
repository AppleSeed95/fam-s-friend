import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <div className='flex'>
                Polish
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <div className='flex'>
                German
            </div>
        ),
    },
    {
        key: '3',
        label: (
            <div className='flex'>
                Spanish
            </div>
        ),
    },
    {
        key: '4',
        label: (
            <div className='flex'>
                French
            </div>
        ),
    },
    {
        key: '5',
        label: (
            <div className='flex'>
                Chinese
            </div>
        ),
    },
    {
        key: '6',
        label: (
            <div className='flex'>
                Japanese
            </div>
        ),
    },
    {
        key: '7',
        label: (
            <div className='flex'>
                Arabic
            </div>
        ),
    },
    {
        key: '8',
        label: (
            <div className='flex'>
                Russian
            </div>
        ),
    },
    {
        key: '9',
        label: (
            <div className='flex'>
                Korean
            </div>
        ),
    },
    {
        key: '10',
        label: (
            <div className='flex'>
                Italian
            </div>
        ),
    },
    {
        key: '11',
        label: (
            <div className='flex'>
                Dutch
            </div>
        ),
    },
    {
        key: '12',
        label: (
            <div className='flex'>
                Turkish
            </div>
        ),
    },
    {
        key: '13',
        label: (
            <div className='flex'>
                Hindi
            </div>
        ),
    },
    {
        key: '14',
        label: (
            <div className='flex'>
                Portuguese
            </div>
        ),
    },

];

const LanguageSwitcherButton: React.FC = () => (
    <Dropdown menu={{ items }}>
        <Space className='ml-2'>
            Choose
            <DownOutlined />
        </Space>
    </Dropdown>
);

export default LanguageSwitcherButton;

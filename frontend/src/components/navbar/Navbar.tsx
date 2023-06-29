import { useState } from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import { Link } from 'react-router-dom';
import { Bars2Icon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleClick = () => {
        console.log('click');
    };

    return (
        <div className='w-100 mx-auto px-8 pt-3 flex flex-nowrap items-center justify-end gap-x-3'>
            <button type='button' className='text-right' id='' onClick={handleClick}>
                <BookmarkIcon className='h-6 w-6 text-greyscale-100 hover:text-main-200' />
            </button>
            <button type='button' className='text-right' id='' onClick={handleClick}>
                <ArrowUpOnSquareIcon className='h-6 w-6 text-greyscale-100 hover:text-main-200' />
            </button>
        </div>
    );
};

export default Navbar;

import { useNavigate } from 'react-router-dom';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const navigate = useNavigate();

    const goToPage = (page: string) => {
        navigate(`/${page}`);
    };

    return (
        <div className='w-100 mx-auto px-8 pt-3 flex flex-nowrap items-center justify-end gap-x-3'>
            <button
                data-testid='bookmark-icon'
                type='button'
                className='text-right'
                onClick={() => goToPage('bookmarks')}
            >
                <BookmarkIcon className='h-8 w-8 text-greyscale-100 hover:text-main-purple-heart' />
            </button>
            <button data-testid='upload-icon' type='button' className='text-right' onClick={() => goToPage('upload')}>
                <ArrowUpOnSquareIcon className='h-8 w-8 text-greyscale-100 hover:text-main-purple-heart' />
            </button>
        </div>
    );
};

export default Navbar;

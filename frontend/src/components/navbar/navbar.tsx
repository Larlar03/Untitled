import { useNavigate } from 'react-router-dom';
import { PencilIcon, ArrowUpOnSquareIcon, HomeIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const navigate = useNavigate();

    const goToPage = (page: string) => {
        navigate(`/${page}`);
    };

    return (
        <div className='w-100 mx-auto px-8 pt-3 mb-12 flex flex-nowrap items-center justify-end gap-x-3'>
            <button data-testid='home-icon' type='button' className='text-right' onClick={() => goToPage('')}>
                <HomeIcon className='h-8 w-8 text-greyscale-100 hover:text-iris' />
            </button>
            <button data-testid='edit-icon' type='button' className='text-right' onClick={() => goToPage('edit')}>
                <PencilIcon className='h-8 w-8 text-greyscale-100 hover:text-iris' />
            </button>
            <button data-testid='upload-icon' type='button' className='text-right' onClick={() => goToPage('upload')}>
                <ArrowUpOnSquareIcon className='h-8 w-8 text-greyscale-100 hover:text-iris' />
            </button>
        </div>
    );
};

export default Navbar;

import { useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const navigate = useNavigate();

    const goToPage = (page: string) => {
        navigate(`/${page}`);
    };

    return (
        <div className='w-11/12 md:w-[500px] mx-auto px-8 pt-4 flex flex-nowrap items-center justify-end gap-x-3'>
            <button data-testid='home-icon' type='button' className='text-right' onClick={() => goToPage('')}>
                <HomeIcon className='h-6 w-6 text-greyscale-100 hover:text-iris' />
            </button>
            <button data-testid='upload-icon' type='button' className='text-right' onClick={() => goToPage('admin')}>
                <UserIcon className='h-6 w-6 text-greyscale-100 hover:text-iris' />
            </button>
        </div>
    );
};

export default Navbar;

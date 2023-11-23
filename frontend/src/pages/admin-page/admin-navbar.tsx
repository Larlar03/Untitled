import { ArrowLeftOnRectangleIcon, PencilIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

interface Props {
    handleLogout: () => void;
    changeView: React.Dispatch<React.SetStateAction<string>>;
}

const AdminNavbar = (props: Props) => {
    const goToPage = (page: string) => {
        props.changeView(page);
    };

    return (
        <div className='w-full md:w-3/5 mb-3 px-3 flex flex-nowrap justify-between'>
            <div>
                <button data-testid='logout-icon' type='button' className='text-right' onClick={props.handleLogout}>
                    <ArrowLeftOnRectangleIcon className='h-6 w-6 text-greyscale-100 hover:text-iris' />
                </button>
            </div>

            <div>
                <button data-testid='edit-icon' type='button' className='text-right' onClick={() => goToPage('edit')}>
                    <PencilIcon className='h-6 w-6 text-greyscale-100 hover:text-iris' />
                </button>
                <button
                    data-testid='upload-icon'
                    type='button'
                    className='text-right'
                    onClick={() => goToPage('upload')}
                >
                    <ArrowUpOnSquareIcon className='h-6 w-6 text-greyscale-100 hover:text-iris' />
                </button>
            </div>
        </div>
    );
};

export default AdminNavbar;

import Studio from '../../types/studios';
import ConfirmationModal from '../modal/confirmation-modal';
import NoResults from '../error/no-results/no-results';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';
import { deleteStudio } from '../../api/delete-studio';

interface Props {
    results?: Studio[] | undefined;
}

const EditList = (props: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [targetId, setTargetId] = useState<string | undefined>('');

    const openModal = async (e: React.MouseEvent<HTMLButtonElement>, studioId: string | undefined, action: string) => {
        e.preventDefault();
        if (action === 'delete') {
            setTargetId(studioId);
            console.log('studio', studioId);

            setErrorMessage('Are you sure you want to delete?');
            setShowModal(true);
        } else if (action === 'edit') {
            console.log(studioId);
            setTargetId(studioId);

            setErrorMessage('Edit');
            setShowModal(true);
        }
    };

    const confirmDeletion = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('target', targetId);
        const res = deleteStudio(targetId);
        console.log('res', res);
        setShowModal(false);
    };

    return (
        <>
            <div className='my-6 px-2 flex flex-col justify-center '>
                <ul className='list-none overflow-y-scroll'>
                    {props.results ? (
                        props.results.map((studio: Studio) => (
                            <li
                                key={studio._id}
                                className='flex flex-row justify-between hover:bg-greyscale-400 rounded py-0.5 pl-2 pr-1 mr-1'
                            >
                                <div> {studio.name}</div>
                                <div className='flex flex-row gap-x-1.5'>
                                    <button
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                                            openModal(e, studio._id, 'edit')
                                        }
                                    >
                                        <PencilIcon className='h-5 w-5 text-black hover:text-cosmic-cobalt' />
                                    </button>
                                    <button
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                                            openModal(e, studio._id, 'delete')
                                        }
                                    >
                                        {/* <DeleteIcon className='ml-1 text-black hover:text-cosmic-cobalt' /> */}
                                        <TrashIcon className='h-5 w-5 text-black hover:text-cosmic-cobalt' />
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className='h-full mt-12'>
                            <NoResults />
                        </div>
                    )}
                    {showModal && (
                        <ConfirmationModal
                            setShowModal={setShowModal}
                            message={errorMessage}
                            delete={confirmDeletion}
                        />
                    )}
                </ul>
            </div>
        </>
    );
};

export default EditList;

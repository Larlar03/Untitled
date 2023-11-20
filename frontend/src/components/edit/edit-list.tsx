import { useNavigate } from 'react-router-dom';
import Studio from '../../types/studios';
import ConfirmationModal from '../modal/confirmation-modal';
import NoResults from '../error/no-results/no-results';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';
import { deleteStudioApi } from '../../api/delete-studio';

interface Props {
    results?: Studio[] | undefined;
}

const EditList = (props: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [targetId, setTargetId] = useState<string | undefined>('');

    const navigate = useNavigate();

    console.log(props.results);

    const openModal = async (event: React.MouseEvent<HTMLButtonElement>, studioId: string | undefined) => {
        event.preventDefault();

        setTargetId(studioId);

        setErrorMessage('Are you sure you want to delete?');
        setShowModal(true);
    };

    const confirmDeletion = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        deleteStudioApi(targetId);
        setShowModal(false);
    };

    const editStudio = (event: React.MouseEvent<HTMLButtonElement>, studio: Studio, studioId: string | undefined) => {
        event.preventDefault();

        delete studio._id;

        const propsToPass = {
            type: 'update',
            studioToEdit: studio,
            studioToEditId: studioId
        };

        // Navigate to the UploadPage with props
        navigate('/upload', { replace: true, state: propsToPass });
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
                                        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                                            editStudio(event, studio, studio._id)
                                        }
                                    >
                                        <PencilIcon className='h-5 w-5 text-black hover:text-cosmic-cobalt' />
                                    </button>
                                    <button
                                        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                                            openModal(event, studio._id)
                                        }
                                    >
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

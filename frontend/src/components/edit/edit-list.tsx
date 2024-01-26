import { useState } from 'react';
import deleteStudioApi from '../../api/delete-studio';
import ConfirmationModal from '../modal/confirmation-modal';
import NoResults from '../error/no-results/no-results';
import Studio from '../../types/studio';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Props {
    studios?: Studio[] | undefined;
    getAllStudios: () => void;
    showForm: (
        event: React.MouseEvent<HTMLButtonElement>,
        formType: string,
        studioId: string | undefined,
        studio: Studio | undefined
    ) => void;
}

const EditList = (props: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [targetId, setTargetId] = useState<string | undefined>('');

    const openModal = async (
        event: React.MouseEvent<HTMLButtonElement>,
        studioId: string | undefined,
        studioName: string | undefined
    ) => {
        event.preventDefault();

        setTargetId(studioId);

        setModalMessage(`Are you sure you want to delete ${studioName}?`);
        setShowModal(true);
    };

    const confirmDeletion = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const responseStatus = await deleteStudioApi(targetId);

        if (responseStatus === 200) {
            setShowModal(false);
            props.getAllStudios();
        } else {
            setModalMessage('A network error occurred');
        }
    };

    return (
        <>
            <div className='my-6 px-2 flex flex-col justify-center '>
                <ul className='list-none overflow-y-scroll'>
                    {props.studios && props.studios.length > 0 ? (
                        props.studios.map((studio: Studio) => (
                            <li
                                key={studio._id}
                                className='flex flex-row justify-between hover:bg-greyscale-400 rounded py-0.5 pl-2 pr-1 mr-1'
                            >
                                <div> {studio.name}</div>
                                <div className='flex flex-row gap-x-1.5'>
                                    <button
                                        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                                            props.showForm(event, 'Update', studio._id, studio)
                                        }
                                    >
                                        <PencilIcon
                                            data-testid='edit-list-edit-icon'
                                            className='h-5 w-5 text-black hover:text-cosmic-cobalt'
                                        />
                                    </button>
                                    <button
                                        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                                            openModal(event, studio._id, studio.name)
                                        }
                                    >
                                        <TrashIcon
                                            data-testid='edit-list-trash-icon'
                                            className='h-5 w-5 text-black hover:text-cosmic-cobalt'
                                        />
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
                            message={modalMessage}
                            delete={confirmDeletion}
                        />
                    )}
                </ul>
            </div>
        </>
    );
};

export default EditList;

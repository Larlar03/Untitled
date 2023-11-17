import Studio from '../../types/studios';
import ConfirmationModal from '../modal/confirmation-modal';
import NoResults from '../error/no-results/no-results';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';

interface Props {
    results?: Studio[] | undefined;
}

const EditList = (props: Props) => {
    const [showModel, setShowModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const deleteStudio = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setErrorMessage('Are you sure you want to delete?');
        setShowModal(true);

        // try {
        //     validateForm(newStudio);
        //     const response = await uploadForm(newStudio);
        //     if (response === 'New studio stored successfully.') {
        //         setIsUploaded(true);
        //     } else {
        //         setErrorMessage('A network error occurred');
        //         setShowModal(true);
        //     }
        // } catch (error: any) {
        //     setErrorMessage(error.message);
        //     setShowModal(true);
        // }
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
                                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => deleteStudio(e)}>
                                        <PencilIcon className='h-5 w-5 text-black hover:text-cosmic-cobalt' />
                                    </button>
                                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => deleteStudio(e)}>
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
                    {showModel && <ConfirmationModal setShowModal={setShowModal} message={errorMessage} />}
                </ul>
            </div>
        </>
    );
};

export default EditList;

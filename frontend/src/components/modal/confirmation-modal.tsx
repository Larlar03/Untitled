import { useRef } from 'react';
import ReactDom from 'react-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import './modal.css';

interface Props {
    setShowModal: any;
    message: string;
    delete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ConfirmationModal = (props: Props) => {
    // close the modal when clicking outside the modal.
    const modalRef: any = useRef();

    const closeModal = (e: any) => {
        if (e.target === modalRef.current) {
            props.setShowModal(false);
        }
    };

    const portal: any = document.getElementById('portal');

    //render the modal JSX in the portal div.
    return ReactDom.createPortal(
        <div className='modal-container' ref={modalRef} onClick={closeModal} data-testid='modal'>
            <div className='modal'>
                <div className='modal__top'>
                    <p data-testid='modal-message'>{props.message && props.message}</p>
                </div>
                <div className='modal__bottom'>
                    <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => props.delete(e)}
                        data-testid='modal-delete-button'
                    >
                        <CheckCircleIcon className='h-10 w-10 text-white hover:text-pale-violet' />
                    </button>
                    <button onClick={() => props.setShowModal(false)} data-testid='modal-close-button'>
                        <XCircleIcon className='h-10 w-10 text-white hover:text-pale-violet' />
                    </button>
                </div>
            </div>
        </div>,
        portal
    );
};

export default ConfirmationModal;

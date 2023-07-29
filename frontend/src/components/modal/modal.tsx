import { useRef } from 'react';
import ReactDom from 'react-dom';
import { XCircleIcon } from '@heroicons/react/24/outline';
import './modal.css';

interface Props {
    setShowModal: any;
    message: string;
}

const Modal = (props: Props) => {
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
                    <button onClick={() => props.setShowModal(false)}>
                        <XCircleIcon className='h-10 w-10 text-error-crimson hover:text-white' />
                    </button>
                </div>
            </div>
        </div>,
        portal
    );
};

export default Modal;

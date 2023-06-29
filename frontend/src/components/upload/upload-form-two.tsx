import { useState } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import './upload-form.css';

interface Props {
    goToFormPage: (pageNumber: number) => void;
}

const UploadForm = (props: Props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>();

    return (
        <div className='mt-12'>
            <form action='submit'>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='website'>Website</label>
                        <input type='text' id='website' name='website' />
                    </span>
                </section>
                <section className='mb-8'>
                    <span className='input-group'>
                        <label htmlFor='instagram'>Instagram</label>
                        <input type='text' id='instagram' name='instagram' />
                    </span>
                </section>
                <section className='mb-8'>
                    <span className='input-group'>
                        <label htmlFor='facebook'>Facebook</label>
                        <input type='text' id='facebook' name='facebook' />
                    </span>
                </section>
                <section className='mb-8'>
                    <div className='mb-3'>
                        <span className='input-group'>
                            <label htmlFor='formFile' className='form-label'>
                                Logo
                            </label>
                            <input className='form-control input' type='file' id='formFile' />
                        </span>
                    </div>
                </section>
                <div className='button-container'>
                    <CtaButton
                        className='button-container__button'
                        text='Back'
                        handleClick={() => props.goToFormPage(1)}
                        isDisabled={isDisabled}
                        type='button'
                    />
                    <CtaButton
                        className='button-container__button'
                        text='Next'
                        handleClick={() => props.goToFormPage(3)}
                        isDisabled={isDisabled}
                        type='button'
                    />
                </div>
            </form>
        </div>
    );
};

export default UploadForm;

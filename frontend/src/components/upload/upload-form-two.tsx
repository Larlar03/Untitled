import { useState } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import './upload-form.css';

interface Props {
    goToFormPage: (pageNumber: number) => void;
    storeNewStudioData: (e: any) => void;
    newStudio: any;
}

const UploadForm = (props: Props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>();

    return (
        <div className='mt-12'>
            <form action='submit'>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='social_links.website'>Website</label>
                        <input
                            type='text'
                            id='social_links.website'
                            name='social_links.website'
                            onChange={props.storeNewStudioData}
                        />
                    </span>
                </section>
                <section className='mb-8'>
                    <span className='input-group'>
                        <label htmlFor='social_links.instagram'>Instagram</label>
                        <input
                            type='text'
                            id='social_links.instagram'
                            name='social_links.instagram'
                            onChange={props.storeNewStudioData}
                        />
                    </span>
                </section>
                <section className='mb-8'>
                    <span className='input-group'>
                        <label htmlFor='social_links.facebook'>Facebook</label>
                        <input
                            type='text'
                            id='social_links.facebook'
                            name='social_links.facebook'
                            onChange={props.storeNewStudioData}
                        />
                    </span>
                </section>
                <section className='mb-8'>
                    <div className='mb-3'>
                        <span className='input-group'>
                            <label htmlFor='logo' className='form-label'>
                                Logo
                            </label>
                            <input
                                className='form-control input'
                                type='file'
                                id='logo'
                                name='logo'
                                onChange={props.storeNewStudioData}
                            />
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

import { useState } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import './upload-form.css';

interface Props {
    goToFormPage: (pageNumber: number) => void;
    storeNewStudioData: (e: any) => void;
}

const UploadForm = (props: Props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>();

    return (
        <form action='submit' className='mt-12'>
            <div className='top'>
                <section className='mb-8'>
                    <span className='input-group'>
                        <label htmlFor='social_links.website'>Website URL</label>
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
                        <label htmlFor='social_links.instagram'>Instagram URL</label>
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
                        <label htmlFor='social_links.facebook'>Facebook URL</label>
                        <input
                            type='text'
                            id='social_links.facebook'
                            name='social_links.facebook'
                            onChange={props.storeNewStudioData}
                        />
                    </span>
                </section>
                <section className='mb-8'>
                    <span className='input-group'>
                        <label htmlFor='logo' className='form-label'>
                            Logo
                        </label>
                        <input
                            className='form-control input'
                            type='file'
                            id='logo'
                            data-testid='file-upload-input'
                            name='logo'
                            onChange={props.storeNewStudioData}
                        />
                    </span>
                </section>
            </div>
            <div className='bottom flex justify-between w-full'>
                <CtaButton
                    className='w-2/5'
                    text='Back'
                    handleClick={() => props.goToFormPage(1)}
                    isDisabled={isDisabled}
                    type='button'
                />
                <CtaButton
                    className='w-2/5'
                    text='Next'
                    handleClick={() => props.goToFormPage(3)}
                    isDisabled={isDisabled}
                    type='button'
                />
            </div>
        </form>
    );
};

export default UploadForm;

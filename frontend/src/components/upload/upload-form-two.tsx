/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import './upload-form.css';

interface Props {
    goToFormPage: (pageNumber: number) => void;
    storeNewStudioData: (e: any) => void;
}

const UploadForm = (props: Props) => {
    const [validWebsite, setValidWebsite] = useState<boolean>(false);
    const [validInstagram, setValidInstagram] = useState<boolean>(true);
    const [validFacebook, setValidFacebook] = useState<boolean>(true);

    const validate = () => {
        // @ts-ignore
        const websiteInput = document.getElementById('social_links.website').value;
        // @ts-ignore
        const instagramInput = document.getElementById('social_links.instagram').value;
        // @ts-ignore

        const facebookInput = document.getElementById('social_links.facebook').value;

        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?(?:www\\.[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\\.[a-zA-Z]{2,}(?:\\/.*)?)$'
        );

        if (websiteInput.length > 0) {
            urlPattern.test(websiteInput) ? setValidWebsite(true) : setValidWebsite(false);
        } else {
            setValidWebsite(true);
        }

        if (instagramInput.length > 0) {
            urlPattern.test(instagramInput) ? setValidInstagram(true) : setValidInstagram(false);
        } else {
            setValidInstagram(true);
        }

        if (facebookInput.length > 0) {
            urlPattern.test(facebookInput) ? setValidFacebook(true) : setValidFacebook(false);
        } else {
            setValidFacebook(true);
        }
    };

    useEffect(() => {
        validate();
    }, [props.storeNewStudioData]);

    return (
        <form action='submit' className='mt-12'>
            <div className='top'>
                <section className='mb-8'>
                    <span className='input-group'>
                        <label htmlFor='social_links.website'>
                            Website URL {!validWebsite && <span className='text-error-crimson'>*</span>}
                        </label>
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
                        <label htmlFor='social_links.instagram'>
                            Instagram URL {!validInstagram && <span className='text-error-crimson'>*</span>}
                        </label>
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
                        <label htmlFor='social_links.facebook'>
                            Facebook URL {!validFacebook && <span className='text-error-crimson'>*</span>}
                        </label>
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
                            id='logoIput'
                            data-testid='logo-upload-input'
                            name='logo'
                            onChange={props.storeNewStudioData}
                        />
                    </span>
                </section>
            </div>
            <div className='bottom flex justify-between w-full'>
                <CtaButton className='w-2/5' text='Back' handleClick={() => props.goToFormPage(1)} type='button' />
                <CtaButton className='w-2/5' text='Next' handleClick={() => props.goToFormPage(3)} type='button' />
            </div>
        </form>
    );
};

export default UploadForm;

import { ChangeEventHandler, useEffect, useState } from 'react';
import Header from '../components/header/header';
import Navbar from '../components/navbar/navbar';
import UploadFormOne from '../components/upload/upload-form-one';
import UploadFormTwo from '../components/upload/upload-form-two';
import UploadFormThree from '../components/upload/upload-form-three';
import Studio from '../types/studios';

const UploadPage = (props: any) => {
    const [formPage, setFormPage] = useState<number>(1);
    const [newStudio, setNewStudio] = useState<Studio>({
        name: '',
        phone_number: '',
        email_address: '',
        location: {
            address: '',
            post_code: '',
            city: '',
            region: '',
            country: ''
        },
        social_links: {
            website: '',
            instagram: '',
            facebook: ''
        },
        logo: '',
        services: []
    });

    useEffect(() => {
        console.log('rendering');
    });

    const goToFormPage = (pageNumber: number): void => {
        setFormPage(pageNumber);
    };

    const storeNewStudioData = (e: any) => {
        const value = e.currentTarget.value;
        const field = e.currentTarget.name;
        const ns: Studio | any = { ...newStudio };
        if (field.includes('.')) {
            const fieldArr = field.split('.');
            console.log('arr', fieldArr);
            ns[fieldArr[0]][fieldArr[1]] = value;
        } else {
            ns[field] = value;
        }
        setNewStudio(ns);
        console.log(newStudio);
    };

    return (
        <>
            <Navbar />
            <div id='page' className='h-full max-w-md p-0 mx-auto'>
                <div id='page__card' className='px-11'>
                    <Header subheading='Upload a Studio' />
                    {formPage === 1 && (
                        <UploadFormOne
                            goToFormPage={goToFormPage}
                            storeNewStudioData={storeNewStudioData}
                            newStudio={newStudio}
                        />
                    )}
                    {formPage === 2 && (
                        <UploadFormTwo
                            goToFormPage={goToFormPage}
                            storeNewStudioData={storeNewStudioData}
                            newStudio={newStudio}
                        />
                    )}
                    {formPage === 3 && <UploadFormThree goToFormPage={goToFormPage} />}
                </div>
                <div id='page__card--shadow'></div>
            </div>
        </>
    );
};

export default UploadPage;

import { useEffect, useState } from 'react';
import Header from '../components/header/header';
import Navbar from '../components/navbar/navbar';
import UploadFormOne from '../components/upload/upload-form-one';
import UploadFormTwo from '../components/upload/upload-form-two';
import UploadFormThree from '../components/upload/upload-form-three';

const UploadPage = (props: any) => {
    const [formPage, setFormPage] = useState<number>(1);
    // Set studio data

    const goToFormPage = (pageNumber: number): void => {
        setFormPage(pageNumber);
    };

    useEffect(() => {
        console.log('rendering');
    });

    return (
        <>
            <Navbar />
            <div id='page' className='h-full max-w-md p-0 mx-auto'>
                <div id='page__card' className='px-11'>
                    <Header subheading='Upload a Studio' />
                    {formPage === 1 && <UploadFormOne goToFormPage={goToFormPage} />}
                    {formPage === 2 && <UploadFormTwo goToFormPage={goToFormPage} />}
                    {formPage === 3 && <UploadFormThree goToFormPage={goToFormPage} />}
                </div>
                <div id='page__card--shadow'></div>
            </div>
        </>
    );
};

export default UploadPage;

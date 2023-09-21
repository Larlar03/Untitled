import { useState } from 'react';
import Header from '../../components/header/header';
import Navbar from '../../components/navbar/navbar';
import UploadFormOne from '../../components/upload/upload-form-one';
import UploadFormTwo from '../../components/upload/upload-form-two';
import UploadFormThree from '../../components/upload/upload-form-three';
import UploadSuccess from '../../components/upload/upload-success';
import Modal from '../../components/modal/modal';
import Studio from '../../types/studios';
import { validateForm } from '../../helpers/validate-form';
import { uploadForm } from '../../helpers/upload-form';

const UploadPage = () => {
    const [showModel, setShowModal] = useState<boolean>(false);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [formPage, setFormPage] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [newStudio, setNewStudio] = useState<Studio>({
        name: 'test',
        phone_number: '01217731747',
        email_address: 'test@gmail.com',
        location: {
            address: '123 test street',
            post_code: 'tst test',
            city: 'Birmingham',
            region: 'West Midlands',
            country: 'England'
        },
        social_links: {
            website: 'www.tets.com',
            instagram: '',
            facebook: ''
        },
        logo: '',
        services: []
    });

    const goToFormPage = (pageNumber: number): void => {
        setFormPage(pageNumber);
    };

    const storeNewStudioData = (e: any) => {
        const value = e.currentTarget.value;
        const field = e.currentTarget.name;
        const ns: any = { ...newStudio };

        if (field.includes('.')) {
            const fieldArr = field.split('.');
            ns[fieldArr[0]][fieldArr[1]] = value;
        } else {
            ns[field] = value;
        }

        if (field === 'logo') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target?.result;
                ns['logo'] = contents;
            };
            reader.readAsDataURL(file);
        }

        setNewStudio(ns);
    };

    const storeServiceData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setNewStudio((prev) => {
            const servicesArr: string[] = [...(prev.services || [])];

            if (servicesArr.includes(value)) {
                const filteredServicesArr = servicesArr.filter((service: string) => service !== value);
                return { ...prev, services: filteredServicesArr };
            } else {
                servicesArr.push(value);
                return { ...prev, services: servicesArr };
            }
        });
    };

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            validateForm(newStudio);
            const response = uploadForm(newStudio);
            if ((await response) === 'New studio stored successfully.') {
                setIsUploaded(true);
            } else {
                setErrorMessage('A network error occurred');
                setShowModal(true);
            }
        } catch (error: any) {
            setErrorMessage(error.message);
            setShowModal(true);
        }
    };

    return (
        <>
            <Navbar />
            <div id='upload-page' className='h-auto min-h-screen grid justify-center'>
                <div
                    id='upload-page__card'
                    className='w-full max-w-md h-auto bg-alabaster p-6 md:max-w-[476px] md:h-[650px] md:rounded-lg md:border-[1px] md:border-cosmic-cobalt md:absolute md:left-[50%] md:translate-x-[-50%] md:z-10'
                >
                    <Header subheading='Upload a Studio' />
                    {isUploaded ? (
                        <>
                            <UploadSuccess />
                        </>
                    ) : (
                        <>
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
                            {formPage === 3 && (
                                <UploadFormThree
                                    goToFormPage={goToFormPage}
                                    storeServiceData={storeServiceData}
                                    newStudio={newStudio}
                                    onSubmit={onSubmit}
                                />
                            )}
                            {showModel && <Modal setShowModal={setShowModal} message={errorMessage} />}
                        </>
                    )}
                </div>
                <div
                    id='upload-page__card--shadow'
                    className='invisible md:visible md:w-[476px] md:h-[650px] md:shadow-xl rounded-lg bg-cosmic-cobalt absolute top-[12.5%] left-[51%] translate-x-[-50%] z-0'
                ></div>
            </div>
        </>
    );
};

export default UploadPage;

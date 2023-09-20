import { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/header';
import Navbar from '../../components/navbar/navbar';
import UploadFormOne from '../../components/upload/upload-form-one';
import UploadFormTwo from '../../components/upload/upload-form-two';
import UploadFormThree from '../../components/upload/upload-form-three';
import UploadSuccess from '../../components/upload/upload-success';
import Modal from '../../components/modal/modal';
import Studio from '../../types/studios';
import { flattenObject } from '../../helpers/flatten-object';

const UploadPage = () => {
    const [showModel, setShowModal] = useState<boolean>(false);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [formPage, setFormPage] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
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
        console.log('value', value);

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

    const validateForm = () => {
        const flattenedStudioObj = flattenObject(newStudio);
        const emptyFieldsArr: string[] = [];

        delete flattenedStudioObj.phone_number;
        delete flattenedStudioObj.instagram;
        delete flattenedStudioObj.facebook;

        const nsKeys = Object.keys(flattenedStudioObj);
        const nsValues = Object.values(flattenedStudioObj);

        nsValues.forEach((val: any, i) => {
            val.length === 0 && emptyFieldsArr.push(nsKeys[i]);
        });

        if (emptyFieldsArr.length > 0) {
            const fields = emptyFieldsArr.join(', ');
            throw new Error(`The following fields are empty: ${fields}`);
        } else {
            uploadForm();
        }
    };

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            validateForm();
        } catch (err: any) {
            setErrorMessage(err.message);
            setShowModal(true);
        }
    };

    const uploadForm = async () => {
        return axios
            .post(`${process.env.VITE_STUDIOS_API}/`, { isFrontend: true, newStudio })
            .then(() => {
                setIsUploaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Navbar />
            <div id='upload-page' className='h-auto min-h-screen grid justify-center'>
                <div
                    id='upload-page__card'
                    className='w-full max-w-md h-auto bg-alabaster p-6 md:max-w-[476px] md:h-[725px] md:rounded-lg md:border-[1px] md:border-cosmic-cobalt md:absolute md:left-[50%] md:translate-x-[-50%] md:z-10'
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
                    className='invisible md:visible md:w-[476px] md:h-[725px] md:shadow-xl rounded-lg bg-cosmic-cobalt absolute top-[12.5%] left-[51%] translate-x-[-50%] z-0'
                ></div>
            </div>
        </>
    );
};

export default UploadPage;
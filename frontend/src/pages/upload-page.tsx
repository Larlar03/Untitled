import { useState } from 'react';
import axios from 'axios';
import Header from '../components/header/header';
import Navbar from '../components/navbar/navbar';
import UploadFormOne from '../components/upload/upload-form-one';
import UploadFormTwo from '../components/upload/upload-form-two';
import UploadFormThree from '../components/upload/upload-form-three';
import UploadSuccess from '../components/upload/upload-success';
import Studio from '../types/studios';

const UploadPage = () => {
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
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

    const validateForm = () => {
        // https://stackoverflow.com/questions/33036487/one-liner-to-flatten-nested-object
        const flattenedStudioObj = Object.assign(
            {},
            ...(function _flatten(o: any): any {
                return [].concat(
                    ...Object.keys(o).map((k) => (typeof o[k] === 'object' ? _flatten(o[k]) : { [k]: o[k] }))
                );
            })(newStudio)
        );

        const emptyFieldsArr: string[] = [];

        const nsKeys = Object.keys(flattenedStudioObj);
        const nsValues = Object.values(flattenedStudioObj);

        nsValues.forEach((val: any, i) => {
            val.length === 0 && emptyFieldsArr.push(nsKeys[i]);
        });

        if (emptyFieldsArr.length > 0) {
            const x = emptyFieldsArr.join(', ');
            throw new Error(`The fields ${x} are empty.`);
        }

        return;
    };

    const submitForm = async () => {
        try {
            validateForm();
        } catch (err) {
            alert(err);
        } finally {
            console.log('done');
            axios
                .post(`${process.env.VITE_STUDIOS_API}/`, { isFrontend: true, newStudio })
                .then((response) => {
                    console.log(response.data);
                })
                .then(() => {
                    setIsUploaded(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <>
            <Navbar />
            <div id='page' className='h-full max-w-md p-0 mx-auto'>
                <div id='page__card' className='px-11'>
                    <Header subheading='Upload a Studio' />
                    {isUploaded ? (
                        <>
                            <UploadSuccess />
                        </>
                    ) : (
                        <>
                            {formPage === 1 && (
                                <UploadFormOne goToFormPage={goToFormPage} storeNewStudioData={storeNewStudioData} />
                            )}
                            {formPage === 2 && (
                                <UploadFormTwo goToFormPage={goToFormPage} storeNewStudioData={storeNewStudioData} />
                            )}
                            {formPage === 3 && (
                                <UploadFormThree
                                    goToFormPage={goToFormPage}
                                    storeServiceData={storeServiceData}
                                    submitForm={submitForm}
                                />
                            )}
                        </>
                    )}
                </div>
                <div id='page__card--shadow'></div>
            </div>
        </>
    );
};

export default UploadPage;

import React from 'react';
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';
import SignUp from '../components/signup/signup';

const SignUpPage = (props: any) => {
    return (
        <>
            <Navbar />
            <div id='page' className='h-full max-w-md p-0 mx-auto'>
                <div id='page__card' className='px-11'>
                    <Header subheading='Sign Up' />
                    <SignUp />
                </div>
                <div id='page__card--shadow'></div>
            </div>
        </>
    );
};

export default SignUpPage;

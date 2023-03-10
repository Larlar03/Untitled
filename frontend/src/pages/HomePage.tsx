import React from 'react';
import Header from '../components/header/Header';
import SearchForm from '../components/search/SearchForm';
import Navbar from '../components/navbar/Navbar';

const HomePage = (props: any) => {
    return (
        <>
            <Navbar />
            <div id='page' className='h-full max-w-md p-0 mx-auto'>
                <div id='page__card' className='px-11'>
                    <Header subheading='Ultrices ornare neque in' />
                    <SearchForm
                        onCitySelection={props.onCitySelection}
                        onOptionSelection={props.onOptionSelection}
                        navigateToResults={props.navigateToResults}
                    />
                </div>
                <div id='page__card-shadow'></div>
            </div>
        </>
    );
};

export default HomePage;

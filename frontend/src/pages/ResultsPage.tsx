import React from 'react';
import Header from '../components/header/Header';
import Results from '../components/results/Results';
import Navbar from '../components/navbar/Navbar';
import Studio from '../types/studios';

const ResultsPage = ({ results }: { results: Array<Studio> }) => {
    return (
        <>
            <Navbar />
            <div className='my-2'>
                <Header subheading='Results' />
                <Results results={results} />
            </div>
        </>
    );
};

export default ResultsPage;

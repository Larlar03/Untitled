import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import Studio from './types/studios';
import ErrorPage from './pages/ErrorPage';
//Test
const App = () => {
    const [studios, setStudios] = useState<Studio[]>();

    const navigate = useNavigate();

    const getStudios = (location: string | undefined, services: string[]) => {
        axios
            .get(`${import.meta.env.VITE_STUDIOS_API}/${location}/services/`, {
                params: {
                    services
                }
            })
            .then((response) => {
                console.log(response.data);
                setStudios(response.data);
            })
            .then(() => {
                navigate('/results');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Routes>
            <Route path='/' element={<HomePage getStudios={getStudios} />} />
            <Route path='/results' element={<ResultsPage results={studios} />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LogInPage />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
};

export default App;

import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/home-page';
import ResultsPage from './pages/results-page';
import UploadPage from './pages/upload-page';
import Studio from './types/studios';
import ErrorPage from './pages/error-page';
import './App.css';

//Test
const App = () => {
    const [studios, setStudios] = useState<Studio[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const getStudios = async (location: string | undefined, services: string[]) => {
        setLoading(true);
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
                setTimeout(() => {
                    setLoading(false);
                    navigate('/results');
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Routes>
            <Route path='/' element={<HomePage isLoading={loading} getStudios={getStudios} />} />
            <Route path='/results' element={<ResultsPage results={studios} />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
};

export default App;

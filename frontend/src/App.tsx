import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import searchStudiosApi from './api/search-studios';

import HomePage from './pages/home-page/home-page';
import ResultsPage from './pages/results-page/results-page';
import UploadPage from './pages/upload-page/upload-page';
import Studio from './types/studios';
import ErrorPage from './pages/error-page/error-page';
import TimeoutError from './components/error/timeout/timeout';
import EditPage from './pages/edit-page/edit-page';

const App = () => {
    const [studios, setStudios] = useState<Studio[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const getStudios = async (location: string | undefined, services: string[]) => {
        setLoading(true);
        try {
            const response = await searchStudiosApi(location, services);

            setStudios(response);

            setTimeout(() => {
                setLoading(false);
                navigate('/results');
            }, 2000);
        } catch (error) {
            // consoleerror(error);
            navigate('/timeout');
        }
    };

    return (
        <Routes>
            <Route path='/' element={<HomePage isLoading={loading} getStudios={getStudios} />} />
            <Route path='/results' element={<ResultsPage results={studios} />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='/edit' element={<EditPage />} />
            <Route path='/timeout' element={<TimeoutError />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
};

export default App;

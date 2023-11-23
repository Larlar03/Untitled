import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import searchStudiosApi from './api/search-studios';

import HomePage from './pages/home-page/home-page';
import ResultsPage from './pages/results-page/results-page';
import Studio from './types/studios';
import ErrorPage from './pages/error-page/error-page';
import TimeoutError from './components/error/timeout/timeout';
import AdminPage from './pages/admin-page/admin-page';

const App = () => {
    const [studios, setStudios] = useState<Studio[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

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
            console.error(error);
            navigate('/timeout');
        }
    };

    return (
        <Routes>
            <Route path='/' element={<HomePage isLoading={loading} getStudios={getStudios} />} />
            <Route path='/results' element={<ResultsPage results={studios} />} />
            <Route path='/admin' element={<AdminPage adminLogin={setIsAdmin} isAdmin={isAdmin} />} />
            <Route path='/timeout' element={<TimeoutError />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
};

export default App;

import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import searchStudiosApi from './api/search-studios';
import getAllServicesApi from './api/get-all-services.ts';

import HomePage from './pages/home-page/home-page';
import ResultsPage from './pages/results-page/results-page';
import ErrorPage from './pages/error-page/error-page';
import TimeoutError from './components/error/timeout/timeout';
import AdminPage from './pages/admin-page/admin-page';

import Studio from './types/studio';
import Service from './types/service';

const App = () => {
    const [studios, setStudios] = useState<Studio[]>();
    const [services, setServices] = useState<Service[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.getItem('session') === 'admin' && setIsAdmin(true);
        getServices();
    }, []);

    useEffect(() => {
        setAdminSession();
    }, [setIsAdmin]);

    const setAdminSession = () => {
        isAdmin && localStorage.setItem('session', 'admin');
    };

    const endAdminSession = () => {
        localStorage.clear();
    };

    window.addEventListener('load', endAdminSession);

    const getServices = async () => {
        const response = await getAllServicesApi();
        // console.log(response);
        setServices(response);
        // const storedServices = localStorage.getItem('services')
        // if (!storedServices) {
        //     localStorage.setItem('session', 'admin');
        // };
        // }
    };

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
            <Route path='/' element={<HomePage isLoading={loading} getStudios={getStudios} services={services} />} />
            <Route path='/results' element={<ResultsPage results={studios} />} />
            <Route path='/admin' element={<AdminPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
            <Route path='/timeout' element={<TimeoutError />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
};

export default App;

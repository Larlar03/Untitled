import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import Axios from 'axios';
import Studio from './types/studios';
//Test
const App = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [studiosInLocation, setStudiosInLocation] = useState<Studio[]>();
    const [filteredStudios, setFilteredStudios] = useState<Studio[]>();

    const getStudiosInCity = (location: string) => {
        Axios.get(`${process.env.REACT_APP_STUDIOS_API}/${location}`).then(
            (response) => {
                setStudiosInLocation(response.data);
            }
        );
    };

    const onOptionSelection = (options: string[]) => {
        setSelectedOptions(options);
    };

    useEffect(() => {
        filterStudiosInLocation();
    }, [selectedOptions]);

    const filterStudiosInLocation = () => {
        if (selectedOptions.includes('Any')) {
            setFilteredStudios(studiosInLocation);
        } else {
            const filteredStudiosInLocation = studiosInLocation?.filter(
                (studio: Studio) => {
                    return selectedOptions.some((option: string) => {
                        return studio.services?.includes(option);
                    });
                }
            );
            setFilteredStudios(filteredStudiosInLocation);
        }
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <HomePage
                        onCitySelection={getStudiosInCity}
                        onOptionSelection={onOptionSelection}
                    />
                }
            />
            <Route
                path="/results"
                element={<ResultsPage results={filteredStudios} />}
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
        </Routes>
    );
};

export default App;
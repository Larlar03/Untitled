import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import Axios from "axios";
import Salon from "./types/salons";

const App: React.FC = () => {
    const [city, setCity] = useState<string | undefined>();
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [salonsInCity, setSalonsInCity] = useState<Salon[]>();
    const [filteredSalons, setFilteredSalons] = useState<Salon[]>();

    useEffect(() => {
        getSalonsInCity();
    }, [city]);

    useEffect(() => {
        filterSalonsInCity();
    }, [selectedServices]);

    const onCitySelection = (city: any) => {
        setCity(city);
    };

    const onServiceSelection = (services: string[]) => {
        setSelectedServices(services);
    };

    const getSalonsInCity = () => {
        Axios.get(`${process.env.REACT_APP_SALONS_API}/${city}`).then(
            (response) => {
                setSalonsInCity(response.data);
                console.log(salonsInCity);
            }
        );
    };

    const filterSalonsInCity = () => {
        const filteredSalonsInCity = salonsInCity?.filter((salon: Salon) => {
            return selectedServices.some((service: string) => {
                return salon.services?.includes(service);
            });
        });

        setFilteredSalons(filteredSalonsInCity);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <SearchPage
                            onCitySelection={onCitySelection}
                            onServiceSelection={onServiceSelection}
                            getSalons={getSalonsInCity}
                        />
                    }
                />
                <Route path="/results" element={<ResultsPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

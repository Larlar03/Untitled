import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import SignUpPage from "./pages/SignUpPage";
import Axios from "axios";
import Salon from "./types/salons";

const App: React.FC = () => {
	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [salonsInCity, setSalonsInCity] = useState<Salon[]>();
	const [filteredSalons, setFilteredSalons] = useState<Salon[]>();

	const getSalonsInCity = (city: string) => {
		Axios.get(`${process.env.REACT_APP_SALONS_API}/${city}`).then(
			(response) => {
				setSalonsInCity(response.data);
			}
		);
	};

	const onServiceSelection = (services: string[]) => {
		setSelectedServices(services);
	};

	useEffect(() => {
		filterSalonsInCity();
	}, [selectedServices]);

	const filterSalonsInCity = () => {
		if (selectedServices.includes("Any")) {
			setFilteredSalons(salonsInCity);
		} else {
			const filteredSalonsInCity = salonsInCity?.filter(
				(salon: Salon) => {
					return selectedServices.some((service: string) => {
						return salon.services?.includes(service);
					});
				}
			);
			setFilteredSalons(filteredSalonsInCity);
		}
	};

	return (
		<Routes>
			<Route
				path="/"
				element={
					<HomePage
						onCitySelection={getSalonsInCity}
						onServiceSelection={onServiceSelection}
					/>
				}
			/>
			<Route
				path="/results"
				element={<ResultsPage results={filteredSalons} />}
			/>
			<Route path="/signup" element={<SignUpPage />} />
		</Routes>
	);
};

export default App;

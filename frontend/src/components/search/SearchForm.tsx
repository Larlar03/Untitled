import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./search-input/SearchInput";
import SearchOptions from "./search-options/SearchOptions";
import SearchPriceRange from "./search-price-range/SearchPriceRange";
import "./SearchForm.css";

export default function SearchForm(props: any) {
    const [services, setServices] = useState<Array<string>>([]);
    const [city, setCity] = useState<any>();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        city && services.length > 0
            ? setIsDisabled(false)
            : setIsDisabled(true);
    }, [city, services]);

    const selectCity = (label: any) => {
        props.onCitySelection(label.label);
        setCity(label.label);
    };

    const selectServices = (options: string[]) => {
        props.onServiceSelection(options);
        setServices(options);
    };

    const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        navigate("/results");
    };

    return (
        <div className="search-form-container">
            <form action="submit">
                <div className="mb-3">
                    <SearchInput selectCity={selectCity} />
                </div>
                <div className="mb-3">
                    <SearchOptions selectServices={selectServices} />
                </div>
                <div className="mb-3">
                    <SearchPriceRange />
                </div>
                <button
                    onClick={() => navigate("/results")}
                    id="submit-button"
                    type="submit"
                    className="btn btn-primary"
                    disabled={isDisabled}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

import { useEffect, useState } from "react";
import SearchInput from "./search-input/SearchInput";
import SearchOptions from "./search-options/SearchOptions";
import SearchPriceRange from "./search-price-range/SearchPriceRange";
import "./SearchForm.css";

export default function SearchForm(props: any) {
    const [services, setServices] = useState<Array<string>>([]);
    const [city, setCity] = useState<any>();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    useEffect(() => {
        city && services.length > 0
            ? setIsDisabled(false)
            : setIsDisabled(true);
    }, [city, services]);

    const selectCity = (event: React.MouseEvent<HTMLElement>) => {
        setCity(event);
        city && props.onCitySelection(city["label"]);
    };

    const selectServices = (options: string[]) => {
        setServices(options);
        services && props.onServiceSelection(services);
    };

    const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event?.preventDefault();
        props.getSalons();
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
                    onClick={onSubmit}
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

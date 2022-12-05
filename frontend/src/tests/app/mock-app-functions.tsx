import Salon from "../../types/salons";

export const mockFilterSalonsInCity = (salons: Salon[], services: string[]) => {
    if (services.includes("Any")) {
        return salons;
    }
    return salons?.filter((salon: Salon) => {
        return services.some((service: string) => {
            return salon.services?.includes(service);
        });
    });
};

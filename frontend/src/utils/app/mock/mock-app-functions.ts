import Studio from '../../../types/studios';

export const mockFilterStudiosInCity = (studios: Studio[], services: string[]) => {
    if (services.includes('Any')) {
        return studios;
    }
    return studios?.filter((studio: Studio) => {
        return services.some((service: string) => {
            return studio.services?.includes(service);
        });
    });
};

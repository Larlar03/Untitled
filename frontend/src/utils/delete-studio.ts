import axios from 'axios';

export const deleteStudio = async (id: string | undefined): Promise<string> => {
    const response = await axios
        .delete(`${process.env.VITE_STUDIOS_API}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch((error) => {
            console.error(error);
        });

    return response?.data;
};

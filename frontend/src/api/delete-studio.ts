import axios from 'axios';

export const deleteStudioApi = async (id: string | undefined): Promise<any> => {
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

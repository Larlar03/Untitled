import axios from 'axios';

const deleteStudioApi = async (id: string | undefined): Promise<number | undefined> => {
    const response = await axios.delete(`${process.env.VITE_STUDIOS_API}/${id}`).catch((error) => {
        console.error(error);
    });

    return response?.status;
};

export default deleteStudioApi;

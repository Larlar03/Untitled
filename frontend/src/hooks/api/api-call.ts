export async function apiCall(apiMethod: string, url: string, data?: any) {
    try {
        const response = await fetch(url, {
            method: apiMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: apiMethod === 'GET' ? null : data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong with the request');
    }
}

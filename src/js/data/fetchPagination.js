import axios from 'axios';

const fetchPagination = async (url) => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return {
                status: response.status,
                message: response.statusText,
                previous: response.data.previous,
                next: response.data.next,
                results: response.data.results
            };
        } else {
            return {
                status: response.status,
                message: response.statusText
            };
        };
    } catch (error) {
        return error;
    };
};

export default fetchPagination;
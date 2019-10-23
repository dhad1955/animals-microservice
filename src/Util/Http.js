const axios = require('axios');

const get = async function(url) {
    try {
        const result = await axios.get(url);
        
        return {
            status: result.status,
            body: result.data
        };

    } catch (e) {
        if(e.response) {
            return {
                status: e.response.status,
                body: e.response.data
            };
        } else {
            throw e;
        }
    }
};

module.exports = { get };
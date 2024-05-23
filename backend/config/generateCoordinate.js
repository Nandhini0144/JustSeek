const axios = require('axios');

// Define an async function to make the API request
const geocodeAddress=async(gaddress)=> {
    const options = {
        method: 'GET',
        url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
        params: {
            address: gaddress
        },
        headers: {
            'X-RapidAPI-Key': '2bd8ea0a7cmsh47e95fe8b9b8f4cp1d3460jsn6229b62f7ab6',
            'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
module.exports=geocodeAddress;
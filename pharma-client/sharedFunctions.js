
const fetch = require('node-fetch');
const { promisify } = require('util');
const sleep = promisify(setTimeout);



async function pause() {
    await sleep(5000);
  }
  
 
  

async function postJSON(url, data) {
    try {
        // Options for the fetch request
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(url, options);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error - status: ${response.status}`);
        }

        // If you expect a JSON response, you can parse it and return it
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(`Error calling ${url}: ${error}`);
        return null;
    }
}

module.exports = {
    postJSON,
    pause
}

async function myFetch(url = '', method, data = {}) {
    // Default options are marked with *
    const fetchBody = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
     
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    };
    if (method !== 'GET') {
      fetchBody.headers = {
        'Content-Type': 'application/json'
      };
      fetchBody.body = JSON.stringify(data); // body data type must match "Content-Type" header
    }
    const response = await fetch(url, fetchBody);
    return await response.json(); // parses JSON response into native JavaScript objects
 }

 export default myFetch;
/* 
This script separates the logic for contacting the flask backend.
It takes two arguements
- address, which is the route to fetch from the backend
- setReturn, Which sets the supplied state variable with the fetched content
*/

const contactBackend = async (address, setReturn) => {
    
    if (address === '/') {
        address = 'http://localhost:5000/';
    }
    try {
        const response = await fetch(address, {
            'methods': 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        setReturn(data);

    } catch (error) {
        console.log(error);
    }
}

export default contactBackend;
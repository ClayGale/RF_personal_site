/* 
This script separates the logic for contacting the flask backend with the /api namespace.
It takes two arguements
- address, which is the route to fetch from the backend
- setReturn, Which sets the supplied state variable with the fetched content
*/

const contactBackend = async (address, setReturn) => {
    try {
        const response = await fetch("/api" + address, {
            'methods': 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        //setTimeout(() => { setReturn(data) }, 2000); // loading animation tester
        setReturn(data);

    } catch (error) {
        console.log(error);
    }
}

export default contactBackend;
/* 
This script separates the logic for contacting the flask backend.
It takes three arguements
- address, which is the route to fetch from the backend
- setReturn, Which sets the supplied state variable with the fetched content
- setAnim, Which toggles the component to transition out while fresh content is being fetched
*/

const contactBackend = async (address, setReturn, setAnim) => {
    setAnim(false);
    try {
        const response = await fetch('http://localhost:5000' + address, {
            'methods': 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        await setAnim(true);
        setReturn(data);

    } catch (error) {
        console.log(error);
    }
}

export default contactBackend;
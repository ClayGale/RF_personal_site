import { useState, useEffect } from 'react';

const Showcase = (props) => {
    const [showcase, setShowcase] = useState('test');

    console.log(showcase);
    useEffect(() => {
        const contactBackend = async () => {
            setAnimSwitch(false);
            try {
                const response = await fetch('http://localhost:5000/showcase', {
                    'methods': 'POST',
                    headers: { 'Content-Type': 'application/json' }
                })
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                const data = await response.json();
                console.log(data);
                setShowcase(data);
                await setAnimSwitch(true);

            } catch (error) {
                console.log(error);
            }
        }
        contactBackend();
    }, []);

    return (
        <div>
            <h1>{project.title}</h1>
            <a href='{ project.link }'> {project.linkdesc}</a>
            <p> {project.longdesc} </p>
            <img url='{{ project.image }}' alt="preview image" />

        </div>
    )
}

export default Showcase;
import { useState, useEffect } from 'react';
import contactBackend from '../Utilities/contactBackend';

const Showcase = (props) => {
    const [showcase, setShowcase] = useState('test');

    console.log(showcase);
    useEffect(() => {
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
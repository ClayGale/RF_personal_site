import { useState, useEffect } from 'react';
import contactBackend from '../Utilities/contactBackend';

const Showcase = (props) => {
    const [content, setContent] = useState([]);

    console.log(props.showcase);
    useEffect(() => {
        if (!(props.showcase === '')) {
            contactBackend('/showcase', setContent, param);
        };
    }, [props.showcase]);

    useEffect(() => {
        if (!(props.showcase === '')) {

        };
    }, [content]);

    

    if (props.showcase === '') {
        return ( null );
    };
    return (
        <div>
            <h1>{project.title}</h1>
            <a href='{ project.link }'> {project.linkdesc}</a>
            <p> {project.longdesc} </p>
            <img url='{{ project.image }}' alt="preview image" />

        </div>
    );
}

export default Showcase;
import React, { useState, useEffect } from 'react';
import contactBackend from '../Utilities/contactBackend';

function createMarkup(markup) {
    return { __html: markup };
}

const Showcase = (props) => {
    const [content, setContent] = useState([]);

    console.log(props.showcase);
    useEffect(() => {
        if (!(props.showcase === '')) {
            contactBackend('/showcase/' + props.showcase, setContent);
        };
    }, [props.showcase]);

    useEffect(() => {
        if (!(props.showcase === '')) {
            console.log('nothin at all');
        };
    }, [content]);

    

    if (props.showcase === '') {
        return ( null );
    };
    return (
        <div dangerouslySetInnerHTML={createMarkup(content.htmlPack)}></div>
    );
}

export default Showcase;
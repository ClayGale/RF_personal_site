import React, { useState, useEffect } from 'react';

function createMarkup(markup) {
    return { __html: markup };
}

const Frame = (props) => {
    const [content, setContent] = useState('');

    let target = props.viewF;
    if (target === '/') { target = '/index' };

    useEffect(() => {
        const contactBackend = async () => {
            try {
                const response = await fetch('http://localhost:5000' + target, {
                    'methods': 'GET',
                    headers: { 'Content-Type': 'application/json'}
                })
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                const data = await response.json();
                console.log(data);
                setContent(data.htmlPack);

            } catch (error) {
                console.log(error);
            }
        }
        contactBackend();
    }, [props.viewF]);


    return (
        <div className="m-2" dangerouslySetInnerHTML={createMarkup(content)}>

        </div>
    )

};

export default Frame;
import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

function createMarkup(markup) {
    return { __html: markup };
}

const Frame = (props) => {
    const [content, setContent] = useState('');
    const [animSwitch, setAnimSwitch] = useState(false);

    let target = props.viewF;
    if (target === '/') { target = '/index' };

    useEffect(() => {
        const contactBackend = async () => {
            setAnimSwitch(false);
            try {
                const response = await fetch('http://localhost:5000' + target, {
                    'methods': 'GET',
                    headers: { 'Content-Type': 'application/json'}
                })
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                const data = await response.json();
                //console.log(data);
                setContent(data.htmlPack);
                setAnimSwitch(true);

            } catch (error) {
                console.log(error);
            }
        }
        contactBackend();
    }, [props.viewF]);


    return (
        <CSSTransition in={animSwitch} timeout={300} classNames="my-frame">
            <div className="m-2" id="content" dangerouslySetInnerHTML={createMarkup(content)}>

            </div>
        </CSSTransition>
    )

};

export default Frame;
import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

function createMarkup(markup) {
    return { __html: markup };
}

const Frame = (props) => {
    const [content, setContent] = useState(''); //state to hold markup
    const [animSwitch, setAnimSwitch] = useState(false); //animation switch for CSSTransition

    let target = props.viewF;
    if (target === '/') { target = '/index' };

    useEffect(() => {
        setAnimSwitch(false);
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
                //console.log(data);
                setContent(data.htmlPack);
                await setAnimSwitch(true);

            } catch (error) {
                console.log(error);
            }
        }
        contactBackend();
    }, [props.viewF]);


    return (
        <CSSTransition in={animSwitch} timeout={500} classNames="my-frame">
            <div className="m-2" id="content" dangerouslySetInnerHTML={createMarkup(content)}>

            </div>
        </CSSTransition>
    )

};

export default Frame;
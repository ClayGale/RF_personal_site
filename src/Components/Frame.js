import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import contactBackend from '../Utilities/contactBackend';

function createMarkup(markup) {
    return { __html: markup };
}

const Frame = (props) => {
    const [content, setContent] = useState(''); //state to hold markup
    const [animSwitchF, setAnimSwitchF] = useState(false); //animation switch for CSSTransition

    let address = props.viewF;
    if (address === '/') { address = '/index' };

    useEffect(() => {
        contactBackend(address, setContent, setAnimSwitchF);
    }, [props.viewF]);


    return (
        <CSSTransition in={animSwitchF} timeout={500} classNames="my-frame">
            <div className="m-2" id="content" dangerouslySetInnerHTML={createMarkup(content.htmlPack)}>

            </div>
        </CSSTransition>
    )

};

export default Frame;
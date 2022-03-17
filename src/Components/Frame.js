import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import contactBackend from '../Utilities/contactBackend';
import Preview from './Preview';

function createMarkup(markup) {
    return { __html: markup };
}

const Frame = (props) => {
    const [content, setContent] = useState(''); //state to hold markup
    const [animSwitchF, setAnimSwitchF] = useState(false); //animation switch for CSSTransition

    let address = props.viewF;
    if (address === '/') { address = '/index' };

    function handleShowcaseRequest(event) {
        console.log(event.target.value);
        props.showcaseRequest(event.target.value);
    };

    useEffect(() => {
        contactBackend(address, setContent, setAnimSwitchF);
        return () => {
            setAnimSwitchF(false);
        };
    }, [props.viewF]);

    useEffect(() => {
        setAnimSwitchF(true);
    }, [content]);


    return (
        <CSSTransition in={animSwitchF} timeout={500} classNames="my-frame">
                <div className="m-2" id="content">
                    <div dangerouslySetInnerHTML={createMarkup(content.htmlPack)}></div>
                    <Preview data={content.data} type={content.type} handleShowcaseRequest={handleShowcaseRequest} />
                </div>
        </CSSTransition>
    )

};

export default Frame;
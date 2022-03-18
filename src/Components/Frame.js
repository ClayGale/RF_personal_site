import React, { useState, useEffect } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import contactBackend from '../Utilities/contactBackend';
import Preview from './Preview';

function createMarkup(markup) {
    return { __html: markup };
}

const Frame = (props) => {
    const [content, setContent] = useState(''); //state to hold markup
    const [animSwitchF, setAnimSwitchF] = useState(false); //animation switch for CSSTransition


    function handleShowcaseRequest(event) {
        console.log(event.target.value);
        props.showcaseRequest(event.target.value);
    };

    useEffect(() => {
        contactBackend(props.viewF, setContent);

        console.log("render");
        return () => {
            console.log("exit");
        };
    }, [props.viewF]);

    useEffect(() => {

        setAnimSwitchF(false);
        setAnimSwitchF(true);
        console.log("content");
    }, [content, props.splash]);


    return (
        <SwitchTransition>
            <CSSTransition key={props.viewF} in={animSwitchF} timeout={500} classNames="my-frame" unmountOnExit>
                <div className="m-2" id="content">
                    <div dangerouslySetInnerHTML={createMarkup(content.htmlPack)}></div>
                    <Preview data={content.data} type={content.type} handleShowcaseRequest={handleShowcaseRequest} />
                </div>
            </CSSTransition>
        </SwitchTransition>
    )

};

export default Frame;
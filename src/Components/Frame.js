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

    useEffect(() => {
        contactBackend(props.viewF, setContent);

        return () => {
            setAnimSwitchF(false);
        };
    }, [props.viewF]);

    useEffect(() => {
        setAnimSwitchF(true);
    }, [content, props.splash]);


    return (
        <SwitchTransition>
            <CSSTransition key={props.viewF} in={animSwitchF} timeout={500} classNames="my-frame" unmountOnExit>
                <div className="m-2" id="content">
                    <section dangerouslySetInnerHTML={createMarkup(content.htmlPack)}></section>
                    <Preview data={content.data} type={content.type} />
                </div>
            </CSSTransition>
        </SwitchTransition>
    )

};

export default Frame;
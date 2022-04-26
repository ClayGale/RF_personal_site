import React, { useState, useEffect } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import contactBackend from '../Utilities/contactBackend';
import createMarkup from '../Utilities/createMarkup';
import Preview from './Preview';
import Resume from './Resume';

const Frame = (props) => {
    const [content, setContent] = useState(''); //state to hold markup
    const [animSwitchF, setAnimSwitchF] = useState(false); //animation switch for CSSTransition

    /* the useEffect hook on the viewF state here sets the content state with fetched html and data
    on the components unmount the css transition is set to false so it can be cleanly toggled for the new state*/
    useEffect(() => {
        contactBackend(props.viewF, setContent);

        return () => {
            setAnimSwitchF(false);
        };
    }, [props.viewF]);

    useEffect(() => {
        setAnimSwitchF(true);
    }, [content, props.splash]);


    /* secondary component returns either the resume component or the preview component depending on the page.
    or nothing if there shouldn't be a secondary component (about page) */
    function secondaryComponent(type) {
        switch (type) {
            case "projects": case "education":
                return <Preview data={content.data} searchSet={content.searchSet} type={content.type} initialSearch={props.initialSearch} />;
            case "resume":
                return <Resume resumeSet={content.resumeSet} resumeBody={content.resumeBody} contentChange={props.contentChange} />;
            default:
                return null;
        }
    }

    return (
        <SwitchTransition>
            <CSSTransition key={props.viewF} in={animSwitchF} timeout={500} classNames="my-frame" unmountOnExit>
                <div className="m-2" >
                    <section id="content" dangerouslySetInnerHTML={createMarkup(content.htmlPack)}></section>
                    {secondaryComponent(content.type)}
                </div>
            </CSSTransition>
        </SwitchTransition>
    )

};

export default Frame;
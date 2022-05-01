import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import contactBackend from '../Utilities/contactBackend';

function createMarkup(markup) {
    return { __html: markup };
}

const Showcase = (props) => {
    const [content, setContent] = useState([]);
    const [animSwitchS, setAnimSwitchS] = useState(false); //animation switch for CSSTransition

    function closeShowcase() {
        setAnimSwitchS(false);
    };

    useEffect(() => {
        if (!(props.showcase === '')) {
            contactBackend('/showcase/' + props.showcase, setContent);
        };

        return () => {
        };
    }, [props.showcase]);

    useEffect(() => {
        if (!(props.showcase === '')) {
            setAnimSwitchS(true);
        };
    }, [content]);

    if (props.showcase === '') {
        return (null);
    };
    return (
        <CSSTransition key={props.showcase} in={animSwitchS} timeout={500} onExited={() => props.setShowcase('')} classNames="my-showcase" unmountOnExit>
            <div id="showcase">
                <button type="button" className="closeButton graphicButton" onClick={closeShowcase}>
                    {'\u2715'}
                </button>
                <div id="showcaseContent" className="scrolling" dangerouslySetInnerHTML={createMarkup(content.htmlPack)}></div>
                <div class="mask" onClick={closeShowcase}></div>
            </div>
        </CSSTransition>

    );
}

export default Showcase;
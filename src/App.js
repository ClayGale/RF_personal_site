import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './main.css';
import './anim.css';
import Frame from './Components/Frame';
import Nav from './Components/Nav';
//import Showcase from './Components/Showcase';


function App() {
    const [view, setView] = useState(window.location.pathname); //page state
    const [animSwitch, setAnimSwitch] = useState(false); //animation switch for CSSTransition

    /* 
    The handleContentChange function is passed into the Nav component.
    The buttons in it send the value of a new page request back here.
    Setting the view will cause the frame component to Hide, request new content, and rerender.
    */
    function handleContentChange(newView) {
        console.log('click out ' + newView);
        setView(newView);
    };

    function handleShowcaseRequest(id) {

    };

    useEffect(() => {
        setAnimSwitch(true);
    }, []);

    return (
        <CSSTransition in={animSwitch} timeout={700} classNames="my-main">
            <div className="App container m-4">
                <Nav active={view} handleContentChange={handleContentChange} />
                <Frame viewF={view} handleShowcaseRequest={handleShowcaseRequest} />
            </div>
        </CSSTransition>
    );

}

export default App;

//<Frame view={view[0]} />
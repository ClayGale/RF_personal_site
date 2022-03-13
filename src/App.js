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
    const [splash, setSplash] = useState(false);

    /* 
    The handleContentChange function is passed into the Nav component.
    The buttons in it send the value of a new page request back here.
    Setting the view will cause the frame component to Hide, request new content, and rerender.
    */
    function contentChange(newView) {
        console.log('click out ' + newView);
        setView(newView);
    };

    function showcaseRequest(id) {
        console.log(id);
    };

    useEffect(() => {
        setSplash(true);
    }, []);
    return (
        <>
            <CSSTransition in={splash} timeout={700} classNames="my-splash">
                <div className="App container m-4">
                    <div id="splash" onClick={() => setSplash(false)}>
                        <h1>Clay Gale</h1>
                        <h3> full stack web developer </h3>
                    </div>
                    <Nav active={view} contentChange={contentChange} splash={splash} />
                    <Frame viewF={view} showcaseRequest={showcaseRequest} />
                </div>
            </CSSTransition>
        </>
    );

}

export default App;

//<Frame view={view[0]} />
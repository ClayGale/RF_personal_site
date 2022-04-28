import React, { useState, useRef, useCallback } from 'react';
import './assets/main.css';
import './assets/anim.css';
import './assets/scroll.css';
import Frame from './Components/Frame';
import Nav from './Components/Nav';
import Splash from './Components/Splash';

function App() {
    const [view, setView] = useState(window.location.pathname); //page state
    const [splash, setSplash] = useState(false);
    // the splash state is out here so the splash component can set it and the nav and frame component can watch it for transitions
    const initialSearch = useRef('') // the initial search ref allows the nested preview component to open with a specific entry

    /* 
    The contentChange function is passed into the Nav component.
    The buttons in it send the value of a new page request back here.
    Setting the view will cause the frame component to Hide, request new content, and rerender.
    */
    const contentChange = useCallback((newView, search = '') => {
        window.history.replaceState(newView, "Title", newView); //setting the URL for clarity
        console.log(search);
        initialSearch.current = search;
        setView(newView);
    });

    return (
        <div className="App">
            <Splash splash={splash} setSplash={setSplash} />
            <Nav active={view} contentChange={contentChange} splash={splash} />
            <Frame viewF={view} splash={splash} contentChange={contentChange} initialSearch={initialSearch} />
            <section id={"contactBar"}>
                <h2> Contact Me! </h2>
                <p> Email: clay.aj.gale@gmail.com </p>
                <p> Phone: 250-826-4293 </p>
            </section>
        </div>
    );

}

export default App;

//<Frame view={view[0]} />
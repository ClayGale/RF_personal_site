import React, { useState } from 'react';
import './assets/main.css';
import './assets/anim.css';
import './assets/scroll.css';
import Frame from './Components/Frame';
import Nav from './Components/Nav';
import Splash from './Components/Splash';
//import Showcase from './Components/Showcase';

function App() {
    const [view, setView] = useState(window.location.pathname); //page state
    const [splash, setSplash] = useState(false);
    //the splash state is out here so the splash component can set it and the nav and frame component can watch it for transitions
    /* 
    The contentChange function is passed into the Nav component.
    The buttons in it send the value of a new page request back here.
    Setting the view will cause the frame component to Hide, request new content, and rerender.
    */
    function contentChange(newView) {
        console.log('click out ' + newView);
        window.history.replaceState(newView, "Title", newView); //setting the URL for clarity
        setView(newView);
    };

    return (
        <div className="App container m-4">
            <Splash splash={splash} setSplash={setSplash} />
            <Nav active={view} contentChange={contentChange} splash={splash} />
            <Frame viewF={view} splash={splash} />
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
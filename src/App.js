import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './main.css';
import './anim.css';
import Frame from './Components/Frame';
import Nav from './Components/Nav';


function App() {
    const [view, setView] = useState(window.location.pathname);
    const [animSwitch, setAnimSwitch] = useState(false);

    //setView(window.location.pathname)

    function handleContentChange(newView) {
        console.log('click out ' + newView);
        //setAnimSwitch(false);
        setView(newView);
    }

    useEffect(() => {

        console.log('view change ' + view);
        setAnimSwitch(true);
    }, []);



    console.log('logging view ' + view);

    return (
        <CSSTransition in={animSwitch} timeout={200} classNames="my-main">
            <div className="App container m-4">
                <Nav active={view} handleContentChange={handleContentChange} />
                <Frame viewF={view} />
            </div>
        </CSSTransition>
    );

}

export default App;

//<Frame view={view[0]} />
import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './main.css';
import './anim.css';
import Frame from './Components/Frame';
import Nav from './Components/Nav';


function App() {
    const [view, setView] = useState(window.location.pathname);
    const [inProp, setInProp] = useState(false);

    //setView(window.location.pathname)

    function handleContentChange(newView) {
        console.log('click out ' + newView);
        setInProp(false);
        setView(newView);
    }

    useEffect(() => {

        console.log('view change ' + view);
        setInProp(true);
    }, []);



    console.log('logging view ' + view);

    //if (loading) { return <div className="App"> loading </div>}
    return (
        <div className="App container m-4">
            <Nav active={view} handleContentChange={handleContentChange} />
            <CSSTransition in={inProp} timeout={400} classNames="my-node">
                <div id='content'>
                    <Frame viewF={view} animSwitch={setInProp} />
                </div>
            </CSSTransition>
        </div>
    );

}

export default App;

//<Frame view={view[0]} />
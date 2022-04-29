import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const Splash = (props) => {

    useEffect(() => { //setting the splash screen to active on initial render
        props.setSplash(true);
        //making the splash screen not linger if the user is coming back to a specific page
        if (window.location.pathname !== '/') { 
            setTimeout(() => { props.setSplash(false) }, 700);
        }
    }, []);

    return (
        <CSSTransition in={props.splash} timeout={300} classNames="my-splash">
            <div id="splash" onClick={() => props.setSplash(false)}>
                <h1>Clay Gale</h1>
                <h3>Full Stack Web Developer</h3>
            </div>
        </CSSTransition>
    )
};

export default Splash;
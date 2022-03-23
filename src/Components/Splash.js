import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const Splash = (props) => {

    useEffect(() => {
        props.setSplash(true);
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
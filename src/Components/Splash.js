import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const Splash = (props) => {
    const [splash, setSplash] = useState(false);

    useEffect(() => {
        setSplash(true);
    }, []);

    return (
        <CSSTransition in={splash} timeout={500} classNames="my-splash">
            <div id="splash" onClick={() => setSplash(false)}>
                <h1>Clay Gale</h1>
                <h3> Full Stack Web Developer </h3>
            </div>
        </CSSTransition>
    )
};

export default Splash;
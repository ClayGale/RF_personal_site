import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import contactBackend from '../Utilities/contactBackend';


const Nav = (props) => {
    const [pages, setPages] = useState([]); //state to hold page list
    const [animSwitchN, setAnimSwitchN] = useState(false); //animation switch for CSSTransition

    function handleNav(event) {
        console.log(event.target.value);
        props.contentChange(event.target.value); //setting the view in the main app component
    }; //changes the page

    useEffect(() => {
        contactBackend('/nav', setPages, setAnimSwitchN);
    }, []);

    let links = []; //container for retrieved nav list
    for (const [key, value] of Object.entries(pages)){ //creating a nav button for each entry
        links.push(<button className="navlink" value={value} key={key} onClick={handleNav}> {key} </button >);
    };

    return (
        <CSSTransition in={animSwitchN} timeout={400} classNames="my-nav">
            <header className="m-2" id="nav" >
                {links}
            </header>
        </CSSTransition>
    )

};

export default Nav;
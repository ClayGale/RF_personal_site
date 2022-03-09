import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';


const Nav = (props) => {
    const [pages, setPages] = useState([]); //state to hold page list
    const [animSwitch, setAnimSwitch] = useState(false); //animation switch for CSSTransition

    function handleNav(event) {
        console.log(event.target.value);
        props.handleContentChange(event.target.value);
    };

    useEffect(() => {
        const contactBackend = async () => {
            try {
                const response = await fetch('http://localhost:5000/nav', {
                    'methods': 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                const data = await response.json();
                //console.log(data);
                setPages(data);
                await setAnimSwitch(true);

            } catch (error) {
                console.log(error);
            }
        }
        contactBackend();
        setAnimSwitch(true);
    }, []);
    let links = [];
    for (const [key, value] of Object.entries(pages)){
        links.push(<button className="navlink" value={value} key={key} onClick={handleNav}> {key} </button >);
    };

    return (
        <CSSTransition in={animSwitch} timeout={400} classNames="my-nav">
            <header className="m-2" id="nav" >
                {links}
            </header>
        </CSSTransition>
    )

};

export default Nav;
import React, { useState, useEffect } from 'react';


const Nav = (props) => {

    const [pages, setPages] = useState([]);

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
                console.log(data);
                setPages(data);

            } catch (error) {
                console.log(error);
            }
        }
        contactBackend();
    }, []);
    let links = [];
    for (const [key, value] of Object.entries(pages)){
        links.push(<button className="navlink" value={value} key={key} onClick={handleNav}> {key} </button >);
    };

    return (
        <header className="m-2" id="nav" >
            {links}
        </header>
    )

};

export default Nav;
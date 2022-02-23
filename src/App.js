import React, { useState, useEffect } from 'react';
import './main.css';
import Frame from './Components/Frame';

function contactBackend(target) {
    var fetchedData;
    fetch('http://localhost:5000/' + target, {
        'methods': 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => fetchedData = response)
        .catch(error => console.log(error))
    return (fetchedData);
}

function App() {
    const [view, setView] = useState([]);

    var mainContent;
    useEffect(() => {
        setView(window.location.pathname)
        if (view === '/') { setView('index') }
        mainContent = contactBackend(view);
    }, [])

    console.log(view);
    var navBar = contactBackend('nav');
    return (
        <div className="App container m-4">
            <Frame viewF={navBar.htmlPack} />
            <Frame viewF={mainContent.htmlPack} />
        </div>
    );

}

export default App;

//<Frame view={view[0]} />
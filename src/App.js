import React, { useState, useEffect } from 'react';
import './main.css';
import Frame from './Components/Frame';

function App() {
    const [view, setView] = useState([]);

    useEffect(() => {
        var page = window.location.pathname;
        if (page === '/') { page = 'index' }
        fetch('http://localhost:5000/' + page, {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => setView(response))
            .catch(error => console.log(error))
    }, [])
    console.log(view);
    return (
        <div className="App container m-4">
            <Frame viewF={view.htmlPack} />
        </div>
    );

}

export default App;

//<Frame view={view[0]} />
import React, { useState, useEffect } from 'react';
//import { render } from 'react-dom';
import Frame from './Components/Frame'

function App() {
    const [view, setView] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/index', {
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
            <Frame view={view} />
        </div>
    );

}

export default App;

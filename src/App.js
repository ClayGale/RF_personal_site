import React, { useState, useEffect} from 'react';
import './main.css';
import Frame from './Components/Frame';
import Nav from './Components/Nav';


function App() {
    const [view, setView] = useState(window.location.pathname);

    //setView(window.location.pathname)

    function handleContentChange(newView) {
        console.log('click out ' + newView);
        setView(newView);
    }

    useEffect(() => {

        //setView(window.location.pathname);
        console.log('view change ' + view);
        //setLoading(false);
    }, []);



    console.log('logging view ' + view);

    //if (loading) { return <div className="App"> loading </div>}
    return (
        <div className="App container m-4">
            <Nav active={view} handleContentChange={handleContentChange} />
            <div id='content'>
                <Frame viewF={view} />
            </div>
        </div>
    );

}

export default App;

//<Frame view={view[0]} />
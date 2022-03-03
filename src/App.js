import React, { useState, useEffect} from 'react';
import './main.css';
import Frame from './Components/Frame';


function App() {
    const [view, setView] = useState(window.location.pathname);

    //setView(window.location.pathname)
    useEffect(() => {

        setView(window.location.pathname);
        console.log('view change ' + view);
        //setLoading(false);
    }, [window.location.pathname]);



    console.log('logging view ' + view);

    //if (loading) { return <div className="App"> loading </div>}
    return (
        <div className="App container m-4">
            <Frame viewF={'/nav'} />
            <div id='content'>
                <Frame viewF={view} />
            </div>
        </div>
    );

}

export default App;

//<Frame view={view[0]} />
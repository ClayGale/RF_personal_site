import React, { useState, useEffect, useRef, useReducer} from 'react';
import './main.css';
import Frame from './Components/Frame';

const ACTIONS = {
    SET_CONTENT: 'set-content',
    GET_CONTENT: 'get-content'
}

function reducer(content, action) {
    switch (action.type) {
        case action.SET_CONTENT:
            console.log('setting ' + action);
            return content[action.payload.key] = action.payload.htmlPack
        default:
            return content
    }
}

function App() {
    const [view, setView] = useState('');
    //const [loading, setLoading] = useState(true);
    const [content, dispatch] = useReducer(reducer, []);
    //const mainContent = useRef(null);
    //const navBar = useRef(null);
    setView(window.location.pathname)
    //if (view === '/') { console.log('correcting view value'); setView('index') }
    //useEffect(() => {
        

    //    console.log('logging content ' + content[view]);
        //setLoading(false);
    //}, [])

    const contactBackend = (target) => {
        fetch('http://localhost:5000/' + target, {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData.htmlPack);
                return responseData.htmlPack;
            })
            .catch(error => console.log(error))
    };


    console.log('hello');
    let one = contactBackend(view);
    console.log(one);
    let two = contactBackend('nav');
    console.log(two);
    dispatch({
        type: ACTIONS.SET_CONTENT,
        payload: { key: view, htmlPack: one }
    });
    console.log('logging view ' + view);
    console.log('logging content array ' + content);
    //navBar = useRef(contactBackend('nav'));
    console.log('logging content ' + content[view]);
    console.log('logging nav ' + content.nav);

    //if (loading) { return <div className="App"> loading </div>}
    return (
        <div className="App container m-4">
            <Frame viewF={content.nav} />
            <Frame viewF={content[view]} />
        </div>
    );

}

export default App;

//<Frame view={view[0]} />
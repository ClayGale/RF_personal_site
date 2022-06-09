import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../assets/preview.css';
import Showcase from './Showcase';
import useSearchItems from "../Utilities/useSearchItems";

const Preview = (props) => {
    const [showcase, setShowcase] = useState(''); //state for the currently active showcase component
    const scrollingBox = useRef(); //ref for the scrolling div so the other elements within can reference its onWheel events
    const searchInput = useRef()
    const [items, handleSearch, graphic] = useSearchItems({ 'data': props.data, 'searchSet': props.searchSet, 'type': props.type },
        handleShowcaseRequest, horizontalScroll)
    /* the useSearchItems is an abstraction for the growing complexity of the preview component.
    it receives the backend data related to preview and builds all the elements and returns
    them based on search input. the search input can be initialized to a default value with the initialSearch ref */

    /* setting the showcase ID */
    function handleShowcaseRequest(ID) {
        setShowcase(ID);
    };

    /* horizontalScroll is pointed to by the onwheel events of both the main scrolling component
    and the individual containers so horizontal scrolling is achieved no matter where the mouse 
    is pointing within the div*/
    function horizontalScroll(event) {
        scrollingBox.current.scroll({
            left: scrollingBox.current.scrollLeft + event.deltaY * 3.5,
            behavior: 'smooth'
        });
    };

    /* the clear input function empties the search field and passes the 'clearSearch' string to
    handleSearch. When it receives that string instead of an event object it resets the search elements*/
    function clearInput(event) {
        searchInput.current.value = '';
        handleSearch('clearSearch');
        searchInput.current.focus();
    }

    useEffect(() => {
        if (props.initialSearch.current !== '') { //setting an initial search value if one has been set
            searchInput.current.value = props.initialSearch.current;
        }
        handleSearch(searchInput.current.value);
        props.initialSearch.current = '';
    }, [])

    return (
        <section >
            <Showcase showcase={showcase} setShowcase={setShowcase} />
            <input type="text" placeholder="Search" ref={searchInput} onChange={handleSearch} />
            <button type="button" className={graphic[0]} onClick={clearInput}>
                {graphic[1]}
            </button>
            <SwitchTransition>
                <CSSTransition key={items} timeout={200} classNames="my-search" unmountOnExit>
                    <div ref={scrollingBox} id={props.type} className="snapping scrolling" onWheel={horizontalScroll}>{items}</div>
                </CSSTransition>
            </SwitchTransition>
        </section>
    );
}

export default Preview;

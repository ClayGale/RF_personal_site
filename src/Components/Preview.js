import React, { useState, useRef } from 'react';
import '../assets/preview.css';
import Showcase from './Showcase';
import useSearchItems from "../Utilities/useSearchItems";

const Preview = (props) => {
    const [showcase, setShowcase] = useState(''); //state for the currently active showcase component
    const scrollingBox = useRef(); //ref for the scrolling div so the other elements within can reference its onWheel events
    const [items, handleSearch] = useSearchItems({ 'data': props.data, 'searchSet':props.searchSet, 'type':props.type }, handleShowcaseRequest, horizontalScroll)
    /* the useSearchItems is an abstraction for the growing complexity of the preview component
    it receives the backend data related to preview and builds all the elements and returns
    them based on search input */

    function handleShowcaseRequest(ID) {
        console.log(ID);
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

    return (
        <section >
            <Showcase showcase={showcase} setShowcase={setShowcase} />
            <input type="text" onChange={handleSearch}/>
            <div ref={scrollingBox} id={props.type} className="snapping scrolling" onWheel={horizontalScroll}>{items}</div>
        </section>
    );
}

export default Preview;

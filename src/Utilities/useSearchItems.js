import React, { useState, useEffect, useRef, useMemo } from 'react';
import contactBackend from './contactBackend';

function buildItems(dataSet, handleShowcaseRequest, horizontalScroll) {
    switch (dataSet.type) {

        case "projects":
            let projectPrevs = []; //container for generated elements
            console.log('rebuild');

            for (const [key, value] of Object.entries(dataSet.data)) {
                let element =
                    <div key={key} className='project'
                        onWheel={horizontalScroll} onClick={() => handleShowcaseRequest(key)}>
                        <h1>{value.title}</h1>
                        <p> {value.desc} </p>
                    </div >;
                console.log(element);
                projectPrevs.push(element);
            };
            console.log("prevs" + projectPrevs)
            return projectPrevs;

        case "education":
            let classPrevs = []; //container for generated elements
            console.log('rebuild');
            for (const [key, value] of Object.entries(dataSet.data)) {
                let element =
                    <div className='schoolContainer' onWheel={horizontalScroll}>
                        <div key={key} className='schoolClass'>
                            <h1>{key}</h1>
                            <h2 className='subtitleAbbreviated'>{value.shortTitle}</h2>
                            <h2 className='subtitleFull'>{value.title}</h2>
                            <p> {value.classdesc} </p>
                        </div>
                    </div>;
                console.log(element);
                classPrevs.push(element);
            };
            console.log("prevs" + classPrevs)
            return classPrevs;

        default:
            console.log("shouldn't be here!");
            console.log(dataSet.type);
            break;
    }
}


export default function useSearchItems(dataSet, handleShowcaseRequest, horizontalScroll, initialSearch) {
    const [items, setItems] = useState([]);
    const searchInput = useRef(initialSearch);

    //const previewItems = useMemo(() => {
    const previewItems = buildItems(dataSet, handleShowcaseRequest, horizontalScroll);
    //}, [dataSet.type]);

    console.log("butts");
    console.log(previewItems);
    //for (const item of previewItems) {
    //    console.log(item);
    //}
    //setItems(previewItems);
    
    return [items, searchInput];
}

/*
code dump


function buildContainer(type) {
    container = []; // this array will contain two entries. first being the the searchbar, second the scroller
    switch (type) {
        case "projects":
            container[0] =

            container[1] = <div ref={scrollingBox} id="projects" className="snapping scrolling" onWheel={horizontalScroll}>{items}</div>
        default:
            break;
    }
}


*/
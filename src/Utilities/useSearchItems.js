import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import contactBackend from './contactBackend';

function buildItems(dataSet, handleShowcaseRequest, horizontalScroll) {
    switch (dataSet.type) {

        case "projects":
            let projectPrevs = []; //container for generated elements
            console.log('rebuild');

            for (const [key, value] of Object.entries(dataSet.data)) {
                let element = [];
                element[0] = key;
                element[1] = {
                    key:
                        <div key={key} className='project'
                            onWheel={horizontalScroll} onClick={() => handleShowcaseRequest(key)}>
                            <h1>{value.title}</h1>
                            <p> {value.desc} </p>
                        </div >
                };
                projectPrevs.push(element);
            };
            return projectPrevs;

        case "education":
            let classPrevs = []; //container for generated elements
            console.log('rebuild');
            for (const [key, value] of Object.entries(dataSet.data)) {
                let element = [];
                element[0] = key;
                element[1] = {
                    key:
                        <div className='schoolContainer' onWheel={horizontalScroll}>
                            <div key={key} className='schoolClass'>
                                <h1>{key}</h1>
                                <h2 className='subtitleAbbreviated'>{value.shortTitle}</h2>
                                <h2 className='subtitleFull'>{value.title}</h2>
                                <p> {value.classdesc} </p>
                            </div>
                        </div>
                };
                classPrevs.push(element);
            };
            return classPrevs;

        default:

            break;
    }
}

function searchItems(query, searchSet) {
    let results = [];
    for (const word of query.toLowerCase().split(' ')) {
        for (const [key, value] of Object.entries(searchSet)) {
            if (value.includes(word)) {
                results = [...results, key];
            }
        }
    }
    return results;
}

function singleResult(result, type) {
    let id = result[0];
    let value = result[1];
    switch (type) {

        case "projects":
            return(
            <div key={id} className='projects'>
                <h1>{value.title}</h1>
                <p> {value.desc} </p>
            </div >);

        case "education":
            return (
                <div key={id}>
                    <h1>{id}</h1>
                    <h2 className='subtitleFull'>{value.title}</h2>
                    <p> {value.classdesc} </p>
                </div>
            );

        default:

            break;
    }
}

function searchResults() {

}

export default function useSearchItems(dataSet, handleShowcaseRequest, horizontalScroll, initialSearch) {

    console.log(dataSet);
    const previewItems = useMemo(() => {
        return buildItems(dataSet, handleShowcaseRequest, horizontalScroll);
    }, [dataSet.type]);

    const handleSearch = useCallback((event) => {
        searchInput.current = event.target.value;
        //console.log(searchInput.current);
        let results = searchItems(searchInput.current, dataSet.searchSet);
        switch (results.length) {
            case 0:
                //setItems(previewItems);

            case 1:
                //const result = previewItems.find(item => item[0] === results[0]); dataSet.data.results[0];
                const result = () => //TODO
                console.log(result);
                if (result !== undefined) {
                    const item = singleResult(result, dataSet.type, handleShowcaseRequest, horizontalScroll);
                    console.log(item);
                    setItems(item);
                }

            default:

                break;
        }
    }, [dataSet.type])

    const [items, setItems] = useState([]);
    const searchInput = useRef(initialSearch);
    const scrollingBox = useRef(); //ref for the scrolling div so the other elements within can reference its onWheel events


    useEffect(() => {
        //setItems(previewItems);
        const interval = setInterval(() => {
            //setItems(previewItems);
        }, 1000);
        return () => clearInterval(interval);
    }, [searchInput.current])
    
    return [items, handleSearch];
}

/*
code dump
<div ref={scrollingBox} id={props.type} className="snapping scrolling" onWheel={horizontalScroll}>

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
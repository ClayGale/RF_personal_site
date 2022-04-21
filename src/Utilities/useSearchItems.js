import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

function buildItems(dataSet, handleShowcaseRequest, horizontalScroll) {
    switch (dataSet.type) {

        case "projects":
            let projectPrevs = [[], []]; //container for keys and generated elements
            console.log('rebuild');

            for (const [key, value] of Object.entries(dataSet.data)) {
                projectPrevs[0].push(key);
                projectPrevs[1].push(
                    <div key={key} className='project'
                        onWheel={horizontalScroll} onClick={() => handleShowcaseRequest(key)}>
                        <h1>{value.title}</h1>
                        <p> {value.desc} </p>
                    </div >
                );
            };
            return projectPrevs;
            break;

        case "education":
            let classPrevs = [[], []]; //container for keys and generated elements
            console.log('rebuild');
            for (const [key, value] of Object.entries(dataSet.data)) {
                classPrevs[0].push(key);
                classPrevs[1].push(
                    <div className='schoolContainer' onWheel={horizontalScroll}>
                        <div key={key} className='schoolClass'>
                            <h1>{key}</h1>
                            <h2 className='subtitleAbbreviated'>{value.shortTitle}</h2>
                            <h2 className='subtitleFull'>{value.title}</h2>
                            <p> {value.classdesc} </p>
                        </div>
                    </div>
                );
            };
            return classPrevs;
            break;

        default:

            break;
    }
}

function searchItems(query, searchSet) {
    let results = [];
    for (const word of query.toLowerCase().split(' ')) {
        for (const [key, value] of Object.entries(searchSet)) {
            if (value.includes(word)) {
                results = [...results, key]; //might need extra work to ensure uniqueness TODO
            }
        }
    }
    return results;
}

function singleResult(id, value, type, handleShowcaseRequest) {
    
    switch (type) {

        case "projects":

            handleShowcaseRequest(id);
            return (
                <div key={id} className='projects' onClick={() => handleShowcaseRequest(id)}>
                    <h1>{value.title}</h1>
                    <p> {value.desc} </p>
                </div >);
            break;

        case "education":
            return (
                <div key={id}>
                    <h1>{id}</h1>
                    <h2>{value.title}</h2>
                    <p> {value.classdesc} </p>
                </div>
            );
            break;

        default:

            break;
    }
}

function searchResults(results, previewItems) {
    let resultItems = [];
    
    for (let i = 0; i < previewItems[0].length; i++) {
        if (results.includes(previewItems[0][i])) {
            resultItems = [...resultItems, previewItems[1][i]];
        }
    } /*
    for (let i = 0; i < results; i++) {
        console.log(previewItems[1]);
        //resultItems = [...resultItems, previewItems[1][previewItems[0][result].indexOf()]];
    } */ //possible more efficient approach

    return resultItems;
}

export default function useSearchItems(dataSet, handleShowcaseRequest, horizontalScroll, initialSearch) {

    //console.log(dataSet);
    const previewItems = useMemo(() => {
        return buildItems(dataSet, handleShowcaseRequest, horizontalScroll);
    }, [dataSet.type]);

    const handleSearch = useCallback((event) => {
        searchInput.current = event.target.value;
        if (searchInput.current === "") { //ending function early if no query has been made
            setItems(previewItems[1]);
            return;
        }
        
        let results = searchItems(searchInput.current, dataSet.searchSet);
        switch (results.length) {
            case 0:
                setItems( previewItems[1] );
                break;

            case 1:
                const result = dataSet.data[results[0]];

                if (result !== undefined) {
                    const item = singleResult(results[0], result, dataSet.type, handleShowcaseRequest);
                    setItems(item);
                }
                break;

            default:
                console.log(results);
                const resultItems = searchResults(results, previewItems);
                console.log(resultItems);
                setItems(resultItems);
                break;
        }
    }, [items, dataSet.type]);

    const [items, setItems] = useState([]);
    const searchInput = useRef(initialSearch);
    const scrollingBox = useRef(); //ref for the scrolling div so the other elements within can reference its onWheel events


    useEffect(() => {
        if (previewItems !== undefined) {
            setItems(previewItems[1]);
        }
    }, [previewItems])
    
    return [items, handleSearch];
}

/*
code dump

const handleSearch = useCallback((event) => {
        searchInput.current = event.target.value;
        //console.log(searchInput.current);
        let results = searchItems(searchInput.current, dataSet.searchSet);
        switch (results.length) {
            case 0:
                setItems(previewItems);
                break;

            case 1:
                //const result = previewItems.find(item => item[0] === results[0]); dataSet.data.results[0];
                //const result = dataSet.data.entries([key, value] => key == results[0]);
                const result = dataSet.data[results[0]];
                console.log(result);

                if (result !== undefined) {
                    const item = singleResult(results[0], result, dataSet.type);
                    console.log(item);
                    setItems(item);
                }
                break;

            default:

                break;
        }
    }, [items, dataSet.type]);

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
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

/* building the preview elements */
function buildItems(dataSet, handleShowcaseRequest, horizontalScroll) {
    switch (dataSet.type) {

        case "projects":
            let projectPrevs = [[], []]; //container for keys and generated elements

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
        /* prevs[0] contains the names of each element for comparison
           prevs[1] contains the actual elements. this is true for both cases*/
        case "education":
            let classPrevs = [[], []]; //container for keys and generated elements
            
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

        default:

            break;
    }
}

/* creating a set of element names based on matches.
 split causes each word to be used for querying. a less strict search rather than the full text query */
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

/* filtering the previewItems elements array by comparing the keys array with the previously
built results array from searchItems
 */
function searchResults(results, previewItems) {
    let resultItems = [];

    for (let i = 0; i < previewItems[0].length; i++) {
        if (results.includes(previewItems[0][i])) {
            resultItems = [...resultItems, previewItems[1][i]];
        }
    }

    return resultItems;
}

const spinner = (props) => {
    const [animation, setAnimation] = useState('');
}

/* in the case of there only being one match different approaches are taken.
 for classes the full description is visible.
 for projects the single element is displayed and showcase is automatically opened*/
function singleResult(id, value, type, handleShowcaseRequest) {
    
    switch (type) {

        case "projects":

            handleShowcaseRequest(id);
            return (
                <div key={id} className='project' onClick={() => handleShowcaseRequest(id)}>
                    <h1>{value.title}</h1>
                    <p> {value.desc} </p>
                </div >);

        case "education":
            return (
                <div key={id}>
                    <h1>{id}</h1>
                    <h2>{value.title}</h2>
                    <p> {value.classdesc} </p>
                </div>
            );

        default:

            break;
    }
}

export default function useSearchItems(dataSet, handleShowcaseRequest, horizontalScroll) {

    const [items, setItems] = useState([]);//main items state
    const searchRef = useRef(''); //ref for the input 

    const previewItems = useMemo(() => {
        return buildItems(dataSet, handleShowcaseRequest, horizontalScroll);
    }, [dataSet.type]);

    const handleSearch = useCallback((event) => {
        if (event === 'clearSearch') { //checking for the clearing string. this allows the close button to reset the search
            setItems(previewItems[1]);
            return;
        }
        searchRef.current = event.target.value;
        if (searchRef.current === "") { //ending search function early if no query has been made
            setItems(previewItems[1]);
            return;
        }
        //checking the search set values
        let results = searchItems(searchRef.current, dataSet.searchSet);
        switch (results.length) {
            case 0: //if no matches are found then just show everything
                setItems(previewItems[1]);
                break;

            case 1: // if there is one match then get the matches original data and call singleResult
                const result = dataSet.data[results[0]];

                if (result !== undefined) {
                    const item = singleResult(results[0], result, dataSet.type, handleShowcaseRequest);
                    setItems(item); // fresh singlet not from preview items
                }
                break;

            default:
                const resultItems = searchResults(results, previewItems);

                setItems(resultItems);
                break;
        }
    }, [items, dataSet.type]);

    //const indicator = (props) => {
    //    const [animation, setAnimation] = useState('');
    //} // maybe come back to this later

    useEffect(() => { //this useEffect allows the elements to always be visible on page load
        if (previewItems !== undefined) {
            setItems(previewItems[1]);
        }
    }, [previewItems])

    return [items, handleSearch];
}

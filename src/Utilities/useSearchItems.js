import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

/* building the preview elements */
function buildItems(dataSet, handleShowcaseRequest, horizontalScroll) {

    switch (dataSet.type) {

        case "projects":
            let projectPrevs = [[], []]; //container for keys and generated elements

            // projects sorted according to preference
            for (const [key, value] of Object.entries(dataSet.data).sort((a, b) => {
                if (a[1].sortIndex === b[1].sortIndex) {return 0;}
                if (a[1].sortIndex > b[1].sortIndex) {return 1;}
                return -1;
            })) {
                projectPrevs[0].push(key);
                projectPrevs[1].push(
                    <div tabIndex="0" key={key} className='project'
                        onWheel={horizontalScroll} onKeyDown={e => e.key === 'Enter' && handleShowcaseRequest(key)}
                        onClick={() => handleShowcaseRequest(key)}>
                        <h1>{value.title}</h1>
                        <p> {value.desc} </p>
                        {buildSkillsElement(value.skills)}
                    </div >
                );
            };
            return projectPrevs;
        /* prevs[0] contains the names of each element for comparison
           prevs[1] contains the actual elements. this is true for both cases */
        case "education":
            let classPrevs = [[], []]; //container for keys and generated elements

            // sorting so the communications classes and computer science classes are first since they are more relevant
            for (const [key, value] of Object.entries(dataSet.data).sort((a, b) => {
                if (a[0].startsWith('C') && b[0].startsWith('C')) {return 0;}
                if (!a[0].startsWith('C') && !b[0].startsWith('C')) {return 0;}
                if (b[0].startsWith('C')) { return 1; }
                else { return -1; }
            })) {
                classPrevs[0].push(key);
                classPrevs[1].push(
                    <div tabIndex="0" key={key} className='schoolContainer' onWheel={horizontalScroll}>
                        <div className='schoolClass'>
                            <h1>{key}</h1>
                            <h2 className='subtitleAbbreviated'>{value.shortTitle}</h2>
                            <h2 className='subtitleFull'>{value.title}</h2>
                            <p> {value.classdesc} </p>
                            {buildSkillsElement(value.skills)}
                        </div>
                    </div>
                );
            };
            return classPrevs;

        default:

            break;
    }
}

/* small function to turn the skill categories array into a neat little row of text */
function buildSkillsElement(skills) {
    let skillsDesc = "Skills: "
    for (const category of skills) {
        for (const skill of category) {
            skillsDesc = skillsDesc.concat(skill, ", ");
        }
    }

    if (skillsDesc.length < 9) { // send nothing if there were no skills
        return null;
    }

    return (
        <p className="skillsElement">
            {skillsDesc.slice(0, -2)}
        </p>
    ); // returning the generated text minus one ", "
}

/* creating a set of element names based on matches.
 split causes each word to be used for querying. a less strict search rather than the full text query */
function searchItems(query, searchSet) { //something is screwed up with single item results TODO
    let results = [];
    let processedQuery = []; 
    if (query[0] === "'" && query[query.length - 1] === "'") { //strict searching when the string is enclosed with ''
        processedQuery = [query.toLowerCase().replaceAll("'","")];
        console.log(processedQuery);
    }
    else if (query.includes(' ')) {// setting up multi-word queries to search by each word
        processedQuery = [query.toLowerCase(), ...query.toLowerCase().split(' ')];
    }
    else {// single word query is just a single word array to keep the code consistent
        processedQuery = [query.toLowerCase()];
    }

    for (const word of processedQuery) {
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

/* in the case of there only being one match different approaches are taken.
 for classes the full description is visible.
 for projects the single element is displayed and showcase is automatically opened */
function singleResult(id, value, type, handleShowcaseRequest) {
    
    switch (type) {

        case "projects":
            // sending request on delay so the animations proceed smoothly
            setTimeout(() => {handleShowcaseRequest(id)}, 500); 
            return (
                <div key={id} className='project' onClick={() => handleShowcaseRequest(id)}>
                    <h1>{value.title}</h1>
                    <p> {value.desc} </p>
                    {buildSkillsElement(value.skills)}
                </div >);

        case "education":
            return (
                <div className='singleClass' key={id}>
                    <h1>{id}</h1>
                    <h2>{value.title}</h2>
                    <p> {value.classdesc} </p>
                    {buildSkillsElement(value.skills)}
                </div>
            );

        default:

            break;
    }
}

export default function useSearchItems(dataSet, handleShowcaseRequest, horizontalScroll) {

    const [items, setItems] = useState([]); //main items state
    const [graphic, setGraphic] = useState(['inactive', '\u2715']); //state for the button attached to the searchbar
    const searchRef = useRef(''); //ref for the searched value


    const previewItems = useMemo(() => {
        return buildItems(dataSet, handleShowcaseRequest, horizontalScroll);
    }, [dataSet.type]);

    const handleSearch = useCallback((search) => {

        if (search === 'clearSearch') { // checking for the clearing string. this allows the close button to reset the search
            setGraphic(['inactive', '\u2715']);
            setItems(previewItems[1]);
            return;
        }

        if (typeof search === 'string') { // if search is a string go directly to searching
            searchRef.current = search;
        } else { // if it is not a string it's an onChange event and the value will be found through target.value
            searchRef.current = search.target.value;
        }

        if (searchRef.current === "") { // ending search function early if no query has been made
            setGraphic(['inactive','\u2715']);
            setItems(previewItems[1]);
            return;
        }
        // checking the search set values

        let results = searchItems(searchRef.current, dataSet.searchSet);
        switch (results.length) {
            case 0: //if no matches are found then just show everything
                setGraphic(['graphicButton', '\u2715']);
                setItems(previewItems[1]);
                break;

            case 1: // if there is one match then get the matches original data and call singleResult
                const result = dataSet.data[results[0]];

                if (result !== undefined) {
                    const item = singleResult(results[0], result, dataSet.type, handleShowcaseRequest);
                    setGraphic(['graphicButton resultButton', '\u2713']);
                    setItems(item); // fresh singlet not from preview items
                }
                break;

            default:
                const resultItems = searchResults(results, previewItems);
                setGraphic(['graphicButton resultButton', '\u2713']);
                setItems(resultItems);
                break;
        }
    }, [items, dataSet.type]);

    useEffect(() => { // this useEffect allows the elements to always be visible on page load
        if (previewItems !== undefined) {
            setItems(previewItems[1]);
        }
    }, [previewItems])

    return [items, handleSearch, graphic];
}

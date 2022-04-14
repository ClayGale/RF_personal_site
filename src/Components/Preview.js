import React, { useState, useMemo, useRef } from 'react';
import Showcase from './Showcase';

const Preview = (props) => {
    const [showcase, setShowcase] = useState(''); //state for the currently active showcase component
    const scrollingBox = useRef(); //ref for the scrolling div so the other elements within can reference it onWheel events
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

    console.log(props);
    const previewItems = useMemo(() => { //memoizing the built list so it only rebuilds on a page change

        switch (props.type) {

            case "projects":
                let projectPrevs = []; //container for generated elements
                console.log('rebuild');

                //for (const [key, value] of Object.entries(props.data.projects)) {
                //    projectPrevs.push(
                //        <div key={key} className='project'
                //            onWheel={horizontalScroll} onClick={() => handleShowcaseRequest(key)}>
                //            <h1>{value.title}</h1>
                //            <a href={value.link}> {value.linkdesc} </a>
                //            <p> {value.shortdesc} </p>
                //        </div >);
                //}; //maybe use this later

                props.data.projects.forEach((project) => {
                    projectPrevs.push(
                        <div key={project.ID} value={project.ID} className='project'
                            onWheel={horizontalScroll} onClick={() => handleShowcaseRequest(project.ID)}>
                            <h1>{project.title}</h1>
                            <a href={project.link}> {project.linkdesc} </a>
                            <p> {project.shortdesc} </p>
                        </div >);
                });
                return projectPrevs;

            case "education":
                let classPrevs = []; //container for generated elements
                console.log('rebuild');
                for (const [key, value] of Object.entries(props.data.classes)) { //creating a nav button for each entry
                    classPrevs.push(
                        <div className='schoolContainer' onWheel={horizontalScroll}>
                            <div key={key} className='schoolClass'>
                                <h1>{key}</h1>
                                <h2>{value.shortTitle}</h2>
                                <h2>{value.title}</h2>
                                <p> {value.classdesc} </p>
                            </div>
                        </div>);
                };
                return classPrevs;

            case "resume":
                return "finish this";
            default:
                break;
        }
    }, [props.type]);
    
    return (
        <section >
            <h4> {props.type} </h4>
            <Showcase showcase={showcase} setShowcase={setShowcase} />
            <div ref={scrollingBox} id={props.type} className="snapping scrolling" onWheel={horizontalScroll}>{previewItems}</div>
        </section>
    );
}

export default Preview;

/*
 props.data.classes.forEach((schoolClass) => {
                    classPrevs.push(
                        <div className='schoolContainer' onWheel={horizontalScroll}>
                            <div key={schoolClass.ID} value={schoolClass.ID} className='schoolClass'>
                                <h1>{schoolClass.ID}</h1>
                                <h2>{schoolClass.shortTitle}</h2>
                                <h2>{schoolClass.title}</h2>
                                <p> {schoolClass.classdesc} </p>
                            </div>
                        </div>);
                });
 */
import React, { useState, useMemo } from 'react';
import Showcase from './Showcase';

const Preview = (props) => {
    const [showcase, setShowcase] = useState('');

    function handleShowcaseRequest(ID) {
        console.log(ID);
        setShowcase(ID);
    };

    //let prevScroll = 0;
    //let translateScroll = 0;
    function horizontalScroll(event) {
        console.log(event.deltaY + ' ' + event.deltaX);
        /*event.target.scrollLeft = event.target.scrollLeft + event.deltaY * 2;*/
        event.target.scroll({
            left: event.target.scrollLeft + event.deltaY * 5,
            behavior: 'smooth'
        });
    };

    console.log(props);
    const previewItems = useMemo(() => {

        switch (props.type) {

            case "projects":
                let projectPrevs = []; //container for generated elements
                console.log('rebuild');
                props.data.projects.forEach((project) => {
                    projectPrevs.push(
                        <div key={project.ID} value={project.ID} className='project' onClick={() => handleShowcaseRequest(project.ID)}>
                            <h1>{project.title}</h1>
                            <a href={project.link}> {project.linkdesc} </a>
                            <p> {project.shortdesc} </p>
                        </div >);
                });
                return projectPrevs;

            case "education":
                let classPrevs = []; //container for generated elements
                console.log('rebuild');
                props.data.classes.forEach((schoolClass) => {
                    classPrevs.push(
                        <div className='schoolContainer'>
                            <div key={schoolClass.ID} value={schoolClass.ID} className='schoolClass'>
                                <h1>{schoolClass.ID}</h1>
                                <h2>{schoolClass.title}</h2>
                                <p> {schoolClass.classdesc} </p>
                            </div>
                        </div>);
                });
                return classPrevs;

            case "resume":
                return "finish this";
            default:
                break;
        }
    }, [props.type]);
    //console.log(prevs);
    return (
        <section >
            <h4> {props.type} </h4>
            <Showcase showcase={showcase} setShowcase={setShowcase} />
            <div id={props.type} className="snapping scrolling" onWheel={horizontalScroll}>{previewItems}</div>
        </section>
    );
}

export default Preview;

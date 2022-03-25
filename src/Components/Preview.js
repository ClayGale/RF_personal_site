import React, { useState } from 'react';
import Showcase from './Showcase';

const Preview = (props) => {
    const [showcase, setShowcase] = useState('');

    function handleShowcaseRequest(ID) {
        console.log(ID);
        setShowcase(ID);
    };


    console.log(props);
    let prevs = []; //container for generated elements
    switch (props.type) {

        case "projects":
            props.data.projects.forEach((project) => {
                prevs.push(<div key={project.ID} value={project.ID} className='project' onClick={() => handleShowcaseRequest(project.ID)}>
                    <h1>{project.title}</h1>
                    <a href={project.link}> {project.linkdesc} </a>
                    <p> {project.shortdesc} </p>
                </div >)});
            break;

        case "education":
            props.data.classes.forEach((schoolClass) => {
                prevs.push(<div key={schoolClass.ID} value={schoolClass.ID} className='schoolClass' onClick={() => handleShowcaseRequest(schoolClass.ID)}>
                    <h1>{schoolClass.ID}</h1>
                    <h2>{schoolClass.title}</h2>
                    <p> {schoolClass.classdesc} </p>
                </div >)
            });
            break;

        case "resume":
            prevs[1] = "RESUMEEEEEEEEE";
            break;
        default:
            break;
    }
    //console.log(prevs);
    return (
        <section >
            <h4> {props.type} </h4>
            <Showcase showcase={showcase} setShowcase={setShowcase} />
            <div id={props.type}>{prevs}</div>
        </section>
    );
}

export default Preview;

/*
            <Showcase showcase={Showcase}/> 
            */

/*
let links = []; //container for retrieved nav list
    for (const [key, value] of Object.entries(pages)){ //creating a nav button for each entry
        links.push(<button className="navlink" value={value} key={key} onClick={handleNav}> {key} </button >);
    };
 */
/*
<div class='project'> <button onClick={{'setShowcase{('}}'{{ project.ID }}'{{')}'}}> clicky </button>
            <h1>{{ project.title }}</h1>
            <a href='{{ project.link }}'> {{ project.linkdesc }} </a>
            <p> {{ project.shortdesc }} </p>
            {% if project.image %}
                <img url='{{ project.image }}' alt="preview image">
            {% endif %}
        </div>
*/
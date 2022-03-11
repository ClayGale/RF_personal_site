import React from 'react';

const Preview = (props) => {

    prevs = []; //container for generated elements
    switch (props.type) {
        case "projects":

            break;
        case "education":

            break;
        case "resume":

            break;
        default:
            break;
    }

}

export default Preview;

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
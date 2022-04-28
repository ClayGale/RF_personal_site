import React from 'react';
import createMarkup from '../Utilities/createMarkup';

function categoryList(category, contentChange) {
    let list = [];
    for (const projSkill of category[0]) {
        list.push(<li key={projSkill} className="projectSkill" onClick={() => contentChange('/projects', projSkill)}>{projSkill}</li>);
    }
    for (const classSkill of category[1]) {
        list.push(<li key={classSkill} className="classSkill" onClick={() => contentChange('/education', classSkill)}>{classSkill}</li>);
    }
    return list;
}

function buildSkillItems(items, contentChange) {
    let categories = [[]]; 

    for (const [name, category] of Object.entries(items)) {
        categories.push(<ul key={name}>{name}{categoryList(category, contentChange)}</ul> );
    }

    return <div id="categories">
        {categories}
    </div>;
}

const Resume = (props) => {

    return <section id="resume" >
        { buildSkillItems(props.resumeSet, props.contentChange) }
        <div id="resumeBody" dangerouslySetInnerHTML={createMarkup(props.resumeBody)} />
    </section>
}

export default Resume;
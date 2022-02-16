import { useState, useEffect } from 'react';

const showcase = (props) => {
    const [showcase, setShowcase] = useState('test');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pId: showcase })
    };

    useEffect(() => {
        fetch('http://localhost:5000/showcase', {
            'methods': 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .catch(error => console.log(error))
    }, [showcase])

    return (
        <div>
            <div> 
                <h1>{ project.title }</h1>
                <a href='{ project.link }'> { project.linkdesc }</a>
                <p> { project.longdesc } </p>
                <img url='{{ project.image }}' alt="preview image" />

            </div>

        </div>
    )
}

export default showcase;
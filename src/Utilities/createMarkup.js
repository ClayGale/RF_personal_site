import dompurify from 'dompurify';
/* my discrete function for setting the html received from the backend. 
 the site does not take user input and the content body is not dynamic not its for the best that i do this */
export default function createMarkup(markup) {
    const sanitizer = dompurify.sanitize;
    return { __html: sanitizer(markup) };
}
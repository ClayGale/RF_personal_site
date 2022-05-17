
/*
    This function returns a selection of html strings for rendering the skeleton loading 
    within the existing setup of markup creation.
    There is a customized skeleton for each of the 4 main pages and one for defaults
 */

export default function SkeletonLoader(type) {
    let output;

    switch (type) {

        case ("/index"):
            output =`
                <div class='sLoader'>
                    <div class='skeleton sTitle'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sTextLast'></div>
                    <br />

                    <div class='skeleton sText'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sTextLast'></div>

                    <div class='skeleton sResume'></div>
                </div>`;
            break;

        case ("/projects"):
            output = `
                <div class='sLoader'>
                    <div class='skeleton sTitle'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sTextLast'></div>
                    <br />
                </div>
                <div class='sProjects'>
                    <div class='skeleton sProject'></div>
                    <div class='skeleton sProject'></div>
                    <div class='skeleton sProject'></div>
                </div>`;
            break;

        case ("/education"):
            output = `
                <div class='sLoader'>
                    <div class='skeleton sTitle'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sTextLast'></div>
                    <br />
                </div>
                <div class='sClasses'>
                    <div class='skeleton sClass'></div>
                    <div class='skeleton sClass'></div>
                    <div class='skeleton sClass'></div>

                    <div class='skeleton sClass'></div>
                    <div class='skeleton sClass'></div>
                    <div class='skeleton sClass'></div>

                    <div class='skeleton sClass'></div>
                    <div class='skeleton sClass'></div>
                    <div class='skeleton sClass'></div>
                </div>`;
            break;

        case ("/about"):
            output = `
                <div class='sLoader'>
                    <div class='skeleton sTitle'></div>
                    <div class='skeleton sHeadshot'></div>
                    <div class='skeleton sTextLast'></div>
                    <div class='skeleton sTitle'></div>

                    <div class='skeleton sTitle'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sTextLast'></div>

                    <div class='skeleton sText'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sTextLast'></div>

                    <div class='skeleton sTitle'></div>
                    <div class='skeleton sText'></div>
                    <br />
                    <div class='skeleton sText'></div>
                    <br />
                    <div class='skeleton sText'></div>
                    <br />
                    <div class='skeleton sText'></div>
                </div>`;
            break;

        default:
            output = `
                <div class='sLoader'>
                    <div class='skeleton sTitle'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sTextLast'></div>
                    <br />

                    <div class='skeleton sText'></div>
                    <div class='skeleton sText'></div>
                    <div class='skeleton sTextLast'></div>
                </div>`;
            break;
    }
    return { htmlPack: output, type: 'loading' }
}
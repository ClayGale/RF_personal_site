function createMarkup(markup) {
    return { __html: markup };
}

const Frame = (props) => {

    return (
        <div className="m-2" dangerouslySetInnerHTML={createMarkup(props.viewF)}>

        </div>
    )

};

export default Frame;
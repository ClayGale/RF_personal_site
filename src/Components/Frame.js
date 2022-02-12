const Frame = (props) => {

    return (
        <div className="m-2">
            {props.view(view => {
                return (
                    { json.parse(view[0]) }
                )
            })}
        </div>
    )

};

export default Frame;
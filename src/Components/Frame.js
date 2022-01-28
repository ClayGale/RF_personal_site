const Frame = (props) => {

    return (
        <div className="m-2">
        {/* Display the viewF details if viewF is not None */} 
   	    {props.view && props.view.map(viewF =>{
            return (

              <div key= {viewF.id}>
                <h2 className="text-primary"> { viewF.title} </h2>
                <p> { viewF.body } </p>
                <p> { viewF.date } </p>
    	        <hr/>
              </div>
            )
            
            })}
        </div>
        )
}

export default Frame;
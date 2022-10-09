     
function Field({title,info, className=''}) {
    return(
        <div className={className}>
            <h5 >{title}</h5>
            <span >{info}</span>
        </div>
    )
}

function Inventory() {
    return(
    <>
        < Field className='model_id' title='engine model' info='engine infor here'/>
        
    </>
    )
}



ReactDOM.render(<Inventory />, document.getElementById('root'))

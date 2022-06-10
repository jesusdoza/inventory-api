

const list = document.querySelector('#inventory')


//add
list.addEventListener('click', (event)=>{
    //what was clicked
    const target = event.target
    console.log(event.target)

    //what item row was clicked
    const item = event.target.closest('.partnumber')
    // console.log(`item is`)
    // console.log( item)

    //quantity of stock
    const quantity = item.querySelector("input[type=number]")

    //partnumber to use later to search database
    const partId = item.querySelector('.partId').innerText
     console.log( partId)

    if(target.id=='reduce-button'){
        console.log(`its reduce button`)
        console.log( `quantity ${quantity.value}`)

        if(quantity.value<=0){
            quantity.value=0
        }else{
            quantity.value= +quantity.value - 1
            console.log( `quantity ${quantity.value}`)
        }
       
    }
    else if(target.id=='add-button'){
        console.log(`its reduce button`)
        console.log( `quantity ${quantity.value}`)
        
        quantity.value= +quantity.value + 1
        console.log( `quantity ${quantity.value}`)

    }

   





//    fetch('/quotes',{
//        method: 'put',
//        headers: {'Content-Type': 'application/json'},
//        body: JSON.stringify({
          
//        })
//    })

//    .then(response =>{
//        if(response.ok){
//            return response.json()
//        }
//    })
//    .then(response=>{
//        console.log(`RESPONSE WAS ***************************`)
//        console.log(response)
//    })
//    .then(res =>{
//        window.location.reload(true)
//    })


})





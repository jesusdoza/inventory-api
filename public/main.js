

const list = document.querySelector('#inventory')
const update = document.querySelector('#update')
const inventory=document.querySelectorAll(".partnumber");

let test
// =================================================
// EVENT LISTENERS


//add or substract amount from stock buttons
list.addEventListener('click', (event)=>{
    changeInventory(event)

})




//event listener for update button
update.addEventListener('click',(event)=>{

    //get all inventory
    const inventory=document.querySelectorAll(".partnumber");
        // console.log(inventory);


    //what items where changed and need update
    const itemsNeedUpdate = itemsChanged(inventory);

    updateItems(itemsNeedUpdate);
})




// ============================================================
// FUNCTIONS
// =============================================================

// update items
async function updateItems(list_){
    
    //loop through the list and make array of fetches
    list_.forEach(async (element) => {
        let responseArr=[]
        const part = element.querySelector('.part_id').innerText
        const model = element.querySelector('.model_id').innerText
        const quantity = +element.querySelector('.quantity').value

        //do fetch update for all
        console.log(`fetch`)
        console.log(` ${part}:: ${model}:: ${quantity} `)
       
         const response = await fetch('/inventory',{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({
                    "partnumber":part,
                    "model":model,
                    "instock":quantity,
               })
            })

        const data = await response.json();
        responseArr.push(data);
       
           
           
        
        
    });
    
    location.reload();
}




// what items had there quantities changed?
//gets all items and filters out
function itemsChanged(list_){
    let newList=[];
    let checklist= list_


    //filter items that have not been changed
    checklist.forEach((e)=>{
        if( +e.querySelector('.quantity').value != +e.querySelector('.instock').innerText){
            newList.push(e)
            // console.log(`${e.querySelector('.quantity').value} ::: ${e.querySelector('.instock').innerText}  `)
        }
    })
    // console.log(newList);
    //return new list with items needing update at database
   return newList;
}





//change inventory number locally to later send 
function changeInventory(event_){
    const target = event_.target
        console.log(event_.target)

    //what item row was clicked
    const item = event_.target.closest('.partnumber')
        // console.log(`item is`)
        // console.log( item)

    //quantity of stock
    const quantity = item.querySelector("input[type=number]")

    //partnumber to use later to search database
    const part_id = item.querySelector('.part_id').innerText
        console.log(part_id)

    test = target.dataset.button;
    //  switch (target.id) {
    switch (target.dataset.button) {
        case 'reduce-button':
                console.log(`its reduce button`)
                // console.log( `quantity ${quantity.value}`)
        
                if(quantity.value<=0){
                    quantity.value=0
                }else{
                    quantity.value= +quantity.value - 1
                    // console.log( `quantity ${quantity.value}`)
                }
                break;
        
        case 'add-button':
                console.log(`its reduce button`)
                console.log( `quantity ${quantity.value}`)
                
                quantity.value= +quantity.value + 1
                console.log( `quantity ${quantity.value}`)
                break;
         
        default:
            console.log(`nothing wanted clicked`)
            break;
     }
}












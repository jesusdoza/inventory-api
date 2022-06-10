

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
    // get all inventory items and send to get checked

    //get all inventory
    const inventory=document.querySelectorAll(".partnumber");
        // console.log(inventory);


    //what items where changed and need update
    const itemsNeedUpdate = itemsChanged(inventory);
    test =itemsNeedUpdate;//testing

    updateItems(itemsNeedUpdate);


})




// ============================================================
// FUNCTIONS
// =============================================================

// update items
function updateItems(list_){
    list_.forEach(element => {

        //do fetch update for all
        console.log(element)
    });
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
        console.log( part_id)

     switch (target.id) {
        case 'reduce-button':
                console.log(`its reduce button`)
                console.log( `quantity ${quantity.value}`)
        
                if(quantity.value<=0){
                    quantity.value=0
                }else{
                    quantity.value= +quantity.value - 1
                    console.log( `quantity ${quantity.value}`)
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












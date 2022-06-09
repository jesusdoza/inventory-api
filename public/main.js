

const update = document.querySelector('#update-button')
const del = document.querySelector('#delete-button')

update.addEventListener('click',  _=>{
    console.log('sent fetch from client')
   fetch('/quotes',{
       method: 'put',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           name: 'bob',
           quote: 'better added because we did not find any jesus'
       })
   })

   .then(response =>{
       if(response.ok){
           return response.json()
       }
   })
   .then(response=>{
       console.log(`RESPONSE WAS ***************************`)
       console.log(response)
   })
   .then(res =>{
       window.location.reload(true)
   })


})




//delete fetch
del.addEventListener('click',  _=>{
    console.log('sent fetch for a delete from client')
   fetch('/quotes',{
       method: 'delete',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           name: 'bob',
        //    quote: 'better added because we did not find any jesus'
       })
   })

   .then(response =>{
       if(response.ok){
           return response.json()
       }
   })
   .then(response=>{
       console.log(`RESPONSE WAS ***************************`)
       console.log(response)
   })
   .then(res =>{
       window.location.reload(true)
   })
   .catch(err =>{
       console.log(`error client side delete  ${err}`)
   })


})
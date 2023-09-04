const axios = require('axios');

for (var index = 16140; index < 20000; index++) {
    
    axios.post('http://localhost:35005/api/products/',  
    {
        "prd_name": "P"+index,
        "prd_description": "Product Test description",
        "prd_pty_id": "1",
        "user": "jvelazqu"
    },         
    {       
        headers: { 
        'Content-Type': 'application/json'
        }                  
    }).then(res => {
        console.log(res.data.message)
    }).catch(error => {
        console.log("Can't create record ")
    }); 
}
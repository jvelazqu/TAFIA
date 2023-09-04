const axios = require('axios');

for (var step = 1000; step < 2000; step++) {
    
    axios.post('http://localhost:35005/api/units/create',  
    {
        "unit_serial_number": "E"+step,
        "unit_type": "ASSY",
        "unit_status": "PASS",
        "transaction": "Unit_creatE",
        "process_step": "1",
        "process_name": "PROCESS1",
        "equipment": "EQP1",
        "job": "JOB011"	
    },         
    {       
        headers: { 
        'Content-Type': 'application/json'
        }                  
    }).then(res => {
        console.log(res.data.message)
    }).catch(error => {
        console.log("Can't create unit ")
    }); 
}
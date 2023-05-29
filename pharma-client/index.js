

const { postJSON, pause } = require('../common/sharedFunctions');

const pharma_server_URL = process.env.PHARMA_SERVER_URL || process.argv[2] || 'http://localhost:8081'
const start_URL = pharma_server_URL + '/start_encounter'
const finish_URL = pharma_server_URL + '/finish_encounter'



// start
const start_message = {
    patient_id: 963401,
    organisation: 013004,
    type: 'start'
}
console.log('client sending start message')
postJSON(start_URL, start_message)
    .then(json => console.log(json))

    
console.log('client about to pause')
pause()
console.log('client paused')

var finish_message = {
    patient_id: 963401,
    organisation: 013004,
    type: 'encounter_complete',
    data: {}
}

postJSON(finish_URL, finish_message)
    .then(json => console.log(json))

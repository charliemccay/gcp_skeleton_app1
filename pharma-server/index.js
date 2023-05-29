const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { postJSON, pause } = require('../common/sharedFunctions');

const tympa_server_URL = process.env.TYMPA_SERVER_URL || process.argv[2] || 'http://localhost:8000'
const assessment_request_URL = tympa_server_URL + '/assessment_request'
const encounter_complete_URL = tympa_server_URL + '/encounter_complete'

const port = 8081;


app.post('/start_encounter', (req, res) => {
    /*
    This endpoint recieves a start request from pharma client. 
    It then posts the assessment request to the tympa server
    */
    console.log('Recieved start request')
    const jsonData = req.body;
    console.log(jsonData)
    console.log('Posting assessment request...');


    var assessment_request = {
        patient_id: 963401,
        organisation: 013004,
        type: "assssment_request"
    };
    postJSON(assessment_request_URL, assessment_request)
    .then(json => console.log(json))

    res.status(200).send(({message:"start_encounter"}))
    
    
});

app.post('/finish_encounter', (req, res) => {
    /*
    This endpoint recieved a post request from pharma client telling it the encounter has been completes
    It then sends an encounter_complete request to the tympa server
    */
    console.log('Encounter completed');
    const jsonData = req.body;
    console.log(jsonData)
    console.log('Posting encounter complete request...');

    var encounter_complete = {
        patient_id: 963401,
        organisation: 013004,
        type: 'encounter_complete'
    };
    postJSON(encounter_complete_URL, encounter_complete)
    .then(json => console.log(json))

    res.status(200).send(({"message":"encounter completed"}))

});

app.post('/assessment_report', (req, res) => {
    /*
    This endpoint recieves the assessment report from the tympa server
    */
    console.log('Assessment report recieved')
    const jsonData = req.body;
    console.log(jsonData)
    console.log('Finished -- pharma server woudl then send this on to the GP')
    res.status(200).send(({"message":"assessment_report"}))


});

app.listen(port, () => {
    console.log(`Listerning on port: ${port}`)
});

module.exports = {
    app
};
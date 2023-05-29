const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { postJSON, pause } = require('../common/sharedFunctions');

const tympa_device_URL = process.env.TYMPA_DEVICE_URL || process.argv[2] || 'http://localhost:3000'
const start_event_URL = tympa_device_URL + '/start_event'
const pharma_server_URL = process.env.PHARMA_SERVER_URL || process.argv[2] || 'http://localhost:8081'
const assessment_report_URL = pharma_server_URL + '/assessment_report'

const port = 8000;


app.post('/assessment_request', (req, res) => {
    /*
    This endpoint recieves a assessment request
    It then will post a start message to the tympa device
    The start message enitiates a timer on the tympa device
    */
    console.log('Recieved assessment request')
    const jsonData = req.body;
    console.log(jsonData)
    console.log('Posting start event to tympa device...')
    postJSON(start_event_URL, jsonData)
        .then(json => console.log(json))
    res.status(200).send({ message: 'Posting start event to tympa device...'});

});

app.post('/encounter_complete', (req, res) => {
    /*
    This endpoint recieves a encounter complete message
    */
    console.log('Recieved encounter complete message')
    const jsonData = req.body;
    console.log(jsonData)
    res.status(200).send({message: 'encounter_complete'})
});

app.post('/tympa_device_finish', (req, res) => {
    /*
    This endpoint recieves a finish event from the tympa device
    It then posts the assessment report to the pharma server
    */
    console.log('The encounter has been completed on the tympa device')
    const jsonData = req.body;
    console.log(jsonData)

    console.log('Will be Posting assessment report...')



    var assessment_report = {
        patient_id: 963401,
        organisation: 013004,
        type: 'assessment_report',
        data: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    };

    postJSON(assessment_report_URL, assessment_report)
    .then(json => console.log(json))

    res.status(200).send({message: 'tympa_device_finish'})
   
});

app.listen(port, () => {
    console.log(`Listerning on port: ${port}`)
});

module.exports = {
    app
};
const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { postJSON, pause } = require('../common/sharedFunctions');

const tympa_server_URL = process.env.TYMPA_SERVER_URL || process.argv[2] || 'http://localhost:8000'
const tympa_device_finish_URL = tympa_server_URL + '/tympa_device_finish'



const port = 3000;


function post_finish_request() {
    console.log('Posting tympa device finish message')

    var tympa_device_finish = {
        'patient_id': 963401,
        'organisation': 013004,
        'type': 'tympa_device_finish',
        'data': {}
    };

    postJSON(tympa_device_finish_URL, tympa_device_finish)
    .then(json => console.log(json))
    

    
};

app.post('/start_event', (req, res) => {
    /*
    This endpoint recieves a start event and sets a timer.
    Once the timer has ran it will send a finish event to the tympa server
    */
    console.log('Recieved start event')
    const jsonData = req.body;
    console.log(jsonData)

/* user is doing stuff */

    console.log(`Starting timer for 5 seconds...`)
    setTimeout(post_finish_request, 10000)

    res.status(200).send(({message:"start event"}))
})

app.listen(port, () => {
    console.log(`Listerning on port: ${port}`)
});

module.exports = {
    app
};
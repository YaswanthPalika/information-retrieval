//below code is working
/*
const { PythonShell } = require('python-shell');

let options = {
    mode: 'text',
    pythonPath: 'python3',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: 'path',
    args: ['arg1', 'arg2']
};

PythonShell.run('../sample.py', options, function(err, results) {
    if (err) console.log(err);
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
});

*/

const {spawn} = require('child_process');

const process  = spawn('python3',['./sample.py','anys']);

process.stdout.on('data',data => {
  console.log(data.toString())
  x=data.toString()
  console.log(x)
})
const { spawn } = require('child_process');

const SCRIPT_NAME = 'main.py';
const ENTER = "\n";

class Runner {
  constructor() {
    this.calibrated = false;
    this.stdio = null;
    this.child = null;
  }

  start() {
    this.child = spawn('python3', [SCRIPT_NAME]);
    
    this.child.stdout.on('data', (data) => {
      this.stdio = data;
      console.log('rcvd:', data);
    });

    this.child.on('exit', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  async calibrate() {
    return new Promise((resolve, reject) => {
      this.stdio = null;
      this.start();

      if(this.calibrated && this.child !== null) {
        return reject();
      }

      const timer = setInterval(() => {
        if(this.stdio) {
          this.calibrated = true;
          clearInterval(timer);
          console.log('Darts calibrated!');
          return resolve();
        }
      }, 500);
    });
  }
  
  write(msg) {
    this.child.write(msg);
  }
}
const runner = async() => {
  const r = new Runner();
  r.start();
  console.log('Darts started');
  await r.calibrate();
  console.log('Done');
}

runner();


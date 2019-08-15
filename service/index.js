const { execSync } = require('child_process');
const NodeWebcam = require( "node-webcam" );

const imageCapture = async () => {
  execSync(`imagesnap -d 'Logitech Camera' /tmp/capture.jpeg > /dev/null`);
};

const nodeWebcam = async () => {
  const Webcam = await NodeWebcam.create();
  return Webcam.capture( "capture", function( err, data ) {
    console.log(err, data);
  } );
};

module.exports = {
  imageCapture,

};
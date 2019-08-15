const { execSync } = require('child_process');
const NodeWebcam = require( "node-webcam" );

const imageCapture = async () => {
  execSync(`imagesnap -d 'Logitech Camera' /tmp/capture.jpeg > /dev/null`);
};

const nodeWebcam = async () => {
  const Webcam = await NodeWebcam.create();
  return new Promise((resolve, reject) =>
    Webcam.capture( "capture", ( err, data ) => 
      err ? reject(err) : resolve(data)
    )
  );
};

module.exports = {
  imageCapture,
  nodeWebcam
};
const { execSync } = require('child_process');

const imageCapture = async () => {
  execSync(`imagesnap -d 'Logitech Camera' /tmp/capture.jpeg > /dev/null`);
};

module.exports = {
  imageCapture
};
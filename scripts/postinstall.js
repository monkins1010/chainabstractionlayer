const { exec } = require('child_process');
const os = require('os');

const command = os.platform() === 'win32'
  ? 'rmdir /s /q node_modules\\bitcoin-ops && git clone https://github.com/VerusCoin/bitcoin-ops.git node_modules\\bitcoin-ops'
  : 'rm -rf node_modules/bitcoin-ops && git clone https://github.com/VerusCoin/bitcoin-ops.git node_modules/bitcoin-ops';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
const { execSync } = require('child_process');
const fs = require('fs');

function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

console.log('Starting troubleshooting process...');

// Check Python version
console.log('Checking Python version:');
console.log(runCommand('python --version'));

// Check pip version
console.log('\nChecking pip version:');
console.log(runCommand('pip --version'));

// Update pip
console.log('\nUpdating pip:');
console.log(runCommand('python -m pip install --upgrade pip'));

// Install wheel
console.log('\nInstalling wheel:');
console.log(runCommand('pip install wheel'));

// Check if requirements.txt exists
if (fs.existsSync('requirements.txt')) {
  console.log('\nAttempting to install dependencies:');
  console.log(runCommand('pip install -r requirements.txt'));
} else {
  console.log('\nrequirements.txt not found. Please ensure it exists in the current directory.');
}

// Check for common system dependencies
console.log('\nChecking for common system dependencies:');
const systemDeps = ['libgl1', 'libglib2.0-0', 'tesseract-ocr'];
systemDeps.forEach(dep => {
  console.log(`Checking ${dep}:`);
  console.log(runCommand(`dpkg -s ${dep} | grep Status`));
});

console.log('\nTroubleshooting complete. Please review the output for any errors or missing dependencies.');
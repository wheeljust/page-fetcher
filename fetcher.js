const request = require('request');
const fs = require('fs');
const readline = require('readline');

//Arguments entered by the user will be in the order of 'node fetcher.js 'link' ./filelocation
const link = process.argv[2];
const fileName = process.argv[3];

const saveFile = () => {
  request(link, (error, response, body) => {
    if (error) {
      console.log(`An error has occured with the link. File not written.`);
      process.exit();
    }

    if(response.statusCode !== 200) {
      console.log(`An error has occured with the link. Status code: ${response.statusCode}. File not written.`);
      process.exit();
    }

    fs.writeFile(fileName, body, err => {
      if (err) {
        console.error(err);
        return;
      }
    });

    console.log(`Downloaded and saved ${body.length} bytes to ${fileName}`);
  });
};

// Check if there is a file name error
if (!fileName.includes('./')) {
  console.log("File name error. Missing './' for local drive");
  // rl.close();
};

if(!fileName.includes('.html')) {
  console.log("File name error. Missing '.html' for file extension");
  // rl.close();
}

// Check for file name, if found prompt the user to input Y yto overwrite the file.
if (fileName.includes('./') && fileName.includes('.html')) {
  
  //Set up readline to allow userinput for file overwrite
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  fs.access(fileName, fs.constants.R_OK, (err) => {
    if (!err) {
      rl.question('This file name already exists. Type Y to overwrite, or type N to exit. ', (answer) => {
        if (answer === 'Y') {
          rl.close();
          saveFile();
        } else {
          rl.close();
        }
      });
    } else {
      saveFile();
      rl.close();
    }
  });
}


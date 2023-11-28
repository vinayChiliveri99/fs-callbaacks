/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 

    Ensure that the function is invoked as follows: 
        fsProblem1(absolutePathOfRandomDirectory, randomNumberOfFiles)
*/

const fs = require('fs');
const path = require('path');

function fsProblem1(absolutePath, numberOfFiles) {
  fs.mkdir(absolutePath, { recursive: true }, (err) => {
    if (err) {
      console.log('Error in making directory: ', err);
    } else {
      // directory has been created,
      // now next task is to create random files in that directory and delete them simultaneously.

      let count = numberOfFiles;

      function createFile() {
        if (count > 0) {
          let fileName = `fileNumber${count}.json`;
          let filePath = path.join(absolutePath, fileName);

          // we need content to that json file.

          let object = {
            name: 'random guy',
            age: count + 20,
          };

          // we need the content to be in json, so lets stringfy it.
          let content = JSON.stringify(object);

          // lets create the file using fs.writeFile(path, content)
          fs.writeFile(filePath, content, (err) => {
            if (err) {
              console.error(
                'Error while creating the file inside directory : ',
                err
              );
            } else {
              // the file has created successfully,

              console.log(`${fileName} is created`);

              // now we need to delete it, so call the delete function, after deletion call the create file.
              setTimeout(() => {
                deleteFile(filePath, () => {
                  // console.log(`${fileName} is deleted`);
                  count--;
                  createFile();
                });
              }, 1200);
            }
          });
        } else {
          console.log(
            `Done with creation and deletion of ${numberOfFiles} random files`
          );
        }
      }
      // we've function def, above. that needs to be invoked to start the function.
      createFile();
    }
  });
}

function deleteFile(filePath, callback) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error while deleting file :', err);
    } else {
      console.log(`file deleted`);
      callback(null);
    }
  });
}

module.exports = { fsProblem1: fsProblem1, deleteFile: deleteFile };

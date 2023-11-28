/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require('fs');

// 1. Read the given file lipsum.txt

function readLipsum(filePath) {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error while reading ${filePath} file `, err);
    } else {
      // give control to uppercase.
      console.log(`read ${filePath} file `);
      upperCaseConvertor(data);
    }
  });
}

// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt

function upperCaseConvertor(data) {
  let upperData = data.toUpperCase();

  // write to new file.
  fs.writeFile('upperData.txt', upperData, (err) => {
    if (err) {
      console.error(
        'Error while writing upperData to upperData.txt',
        err
      );
    } else {
      // give control to store the filename in filenames.txt.
      console.log(
        'converted lipsum file to uppercase and written in upperData.txt'
      );
      storeFileName('upperData.txt');
    }
  });
}

function storeFileName(fileName) {
  fs.appendFile('fileNames.txt', `${fileName}\n`, (err) => {
    if (err) {
      console.error(
        `Error while writing ${fileName} to fileNames.txt :`,
        err
      );
    } else {
      console.log(`Written ${fileName} to fileNames.txt file`);

      // now give control to lowerCase
      lowerCaseConvertor(fileName);
    }
  });
}

// 3. Read the new file and convert it to lower case.
// Then split the contents into sentences.
// Then write it to a new file. Store the name of the new file in filenames.txt

function lowerCaseConvertor(fileName) {
  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error while reading ${fileName} file`, err);
    } else {
      console.log(
        `Read ${fileName} file and moving ahead to convert it to lowercase.`
      );
      let lowerData = data.toLowerCase();
      let splittedData = lowerData.split('. ');

      // handle control to write the splitted data to new file.
      writeSplittedData(splittedData);
    }
  });
}

function writeSplittedData(data) {
  // splitted data is in array, so while writing to file use .join to make them sentences.

  fs.writeFile('lowerData.txt', data.join('\n'), (err) => {
    if (err) {
      console.error('error while writing data to lowerData.txt', err);
    } else {
      console.log('written data in sentences to lowerData.txt');

      // give control to store the name in filenames.txt
      storeFileName2('lowerData.txt');
    }
  });
}

function storeFileName2(fileName) {
  fs.appendFile('fileNames.txt', `${fileName}\n`, (err) => {
    if (err) {
      console.error(
        `Error while writing ${fileName} to fileNames.txt :`,
        err
      );
    } else {
      console.log(`written ${fileName} to fileNames.txt`);

      // give control to read new files and sort content.
      readFiles('fileNames.txt');
    }
  });
}

// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt

function readFiles(filePath) {
  let dataContainer = [];

  // read the content of this files and store them in a container.

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error while reading files from ${filePath}`);
    } else {
      let arr = data.split('\n');

      // now read files data, where file names located in the array.

      for (let i = 0; i < 2; i++) {
        fs.readFile(arr[i], 'utf-8', (err, data) => {
          if (err) {
            console.error(
              `Error while reading ${arr[i]} file: `,
              err
            );
          } else {
            dataContainer = [...dataContainer, ...data.split(' ')];

            if (i == 1) {
              console.log(
                `Read and sorted data of ${arr[0]} and ${arr[1]} files and moving to write them to sortedData.txt file`
              );
              // console.log(dataContainer);
              writeSortedData(
                'sortedData.txt',
                dataContainer.sort().join('\n')
              );
            }
          }
        });
      }
    }
  });
}

function writeSortedData(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(
        'Error while writing sorted data to sortedData.txt :',
        err
      );
    } else {
      console.log(
        `Sorted data successfully written to ${filePath} file`
      );
      // Store the name of the new file in filenames.txt

      storeSortedFileName('fileNames.txt', filePath);
    }
  });
}

function storeSortedFileName(filePath, content) {
  fs.appendFile(filePath, `${content}\n`, (err) => {
    if (err) {
      console.error(
        `Error while writing ${content} to ${filePath} :`,
        err
      );
    } else {
      console.log(
        `Successfully added ${content} to ${filePath} file`
      );

      // now handover the control to read and delete those files simultaneously.

      readFilesAndDelete(filePath);
    }
  });
}

// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

function readFilesAndDelete(filePath) {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(
        `Error while reading the ${filePath} file: `,
        err
      );
    } else {
      let fileNames = data.split('\n').filter((f) => f !== '');

      if (fileNames.length > 0) {
        deleteFiles(fileNames, () => {
          console.log('All files deleted successfully');
        });
      }
    }
  });
}

function deleteFiles(fileNames, callback) {
  let count = fileNames.length;

  function deleteNextFile() {
    if (count > 0) {
      let fileName = fileNames[count - 1];
      deleteFile(fileName, () => {
        count--;
        console.log(`${fileName} file deleted successfully`);
        deleteNextFile();
      });
    } else {
      callback();
    }
  }

  deleteNextFile();
}

function deleteFile(filePath, callback) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error while deleting file ${filePath}:`, err);
    } else {
      // console.log(`${filePath} file deleted`);
      callback();
    }
  });
}

module.exports = readLipsum;

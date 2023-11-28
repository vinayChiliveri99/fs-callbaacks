const fs = require('fs');

// 1. Read the given file lipsum.txt
fs.readFile('lipsum.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error while reading lipsum.txt:', err);
  } else {
    console.log('Read lipsum.txt successfully');

    // 2. Convert the content to uppercase & write to a new file
    let upperContent = data.toUpperCase();
    fs.writeFile('upperFile.txt', upperContent, (err) => {
      if (err) {
        console.error('Error while writing to upperFile.txt:', err);
      } else {
        console.log(
          'Converted to uppercase and written to upperFile.txt successfully'
        );

        // Store the name of the new file in filenames.txt
        fs.appendFile('filenames.txt', 'upperFile.txt\n', (err) => {
          if (err) {
            console.error(
              'Error while writing upperFile.txt in filenames.txt:',
              err
            );
          } else {
            console.log(
              'upperFile.txt file name added to filenames.txt'
            );

            // 3. Read the new file and convert it to lower case
            fs.readFile(
              'upperFile.txt',
              'utf-8',
              (err, upperData) => {
                if (err) {
                  console.error(
                    'Error while reading upperFile.txt:',
                    err
                  );
                } else {
                  let lowerContent = upperData.toLowerCase();

                  // Split the contents into sentences
                  let sentences = lowerContent.split('. ');

                  // Write it to a new file
                  fs.writeFile(
                    'lowerFile.txt',
                    sentences.join('\n'),
                    (err) => {
                      if (err) {
                        console.error(
                          'Error while writing to lowerFile.txt:',
                          err
                        );
                      } else {
                        console.log(
                          'Converted to lowercase, splitted, and written to lowerFile.txt successfully'
                        );

                        // Store the name of the new file in filenames.txt
                        fs.appendFile(
                          'filenames.txt',
                          'lowerFile.txt\n',
                          (err) => {
                            if (err) {
                              console.error(
                                'Error while writing lowerFile.txt in filenames.txt:',
                                err
                              );
                            } else {
                              console.log(
                                'lowerFile.txt file name added to filenames.txt'
                              );

                              // 4. Read the new files, sort the content, write it out to a new file
                              fs.readFile(
                                'filenames.txt',
                                'utf-8',
                                (err, filenamesData) => {
                                  if (err) {
                                    console.error(
                                      'Error while reading filenames.txt:',
                                      err
                                    );
                                  } else {
                                    let filenames = filenamesData
                                      .split('\n')
                                      .filter(Boolean);

                                    let sortedData = '';
                                    let filesRead = 0;

                                    filenames.forEach((filename) => {
                                      fs.readFile(
                                        filename,
                                        'utf-8',
                                        (err, fileContent) => {
                                          if (err) {
                                            console.error(
                                              `Error while reading ${filename}:`,
                                              err
                                            );
                                          } else {
                                            sortedData +=
                                              fileContent
                                                .split(' ')
                                                .sort()
                                                .join('\n') + '\n';
                                            filesRead++;

                                            if (
                                              filesRead ===
                                              filenames.length
                                            ) {
                                              fs.writeFile(
                                                'sortedData.txt',
                                                sortedData,
                                                (err) => {
                                                  if (err) {
                                                    console.error(
                                                      'Error while writing to sortedData.txt:',
                                                      err
                                                    );
                                                  } else {
                                                    console.log(
                                                      'Sorted data written to sortedData.txt successfully'
                                                    );

                                                    // Store the name of the new file in filenames.txt
                                                    fs.appendFile(
                                                      'filenames.txt',
                                                      'sortedData.txt\n',
                                                      (err) => {
                                                        if (err) {
                                                          console.error(
                                                            'Error while writing sortedData.txt in filenames.txt:',
                                                            err
                                                          );
                                                        } else {
                                                          console.log(
                                                            'sortedData.txt file name added to filenames.txt'
                                                          );

                                                          // 5. Read the contents of filenames.txt and delete all the new files
                                                          fs.readFile(
                                                            'filenames.txt',
                                                            'utf-8',
                                                            (
                                                              err,
                                                              filenamesToDelete
                                                            ) => {
                                                              if (
                                                                err
                                                              ) {
                                                                console.error(
                                                                  'Error while reading filenames.txt:',
                                                                  err
                                                                );
                                                              } else {
                                                                setTimeout(
                                                                  () => {
                                                                    let filesToDelete =
                                                                      filenamesToDelete
                                                                        .split(
                                                                          '\n'
                                                                        )
                                                                        .filter(
                                                                          Boolean
                                                                        );
                                                                    deleteFiles(
                                                                      filesToDelete,
                                                                      0
                                                                    );
                                                                  },
                                                                  8500
                                                                );
                                                              }
                                                            }
                                                          );
                                                        }
                                                      }
                                                    );
                                                  }
                                                }
                                              );
                                            }
                                          }
                                        }
                                      );
                                    });
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
  }
});

// Function to delete files
function deleteFiles(files, index) {
  if (index < files.length) {
    fs.unlink(files[index], (err) => {
      if (err) {
        console.error(`Error while deleting ${files[index]}:`, err);
      } else {
        console.log(`Deleted file: ${files[index]}`);
      }

      // Delete the next file
      deleteFiles(files, index + 1);
    });
  }
}

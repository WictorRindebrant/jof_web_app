// Replace with the correct path to your text file
const filePath = 'rules.txt'; 

fetch(filePath)
  .then(response => response.text()) // Read the file as text
  .then(data => {
    document.getElementById('fileContent').textContent = data; // Display the file content in the page
  })
  .catch(error => {
    console.error('Error reading the file:', error);
  });
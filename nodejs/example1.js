const fs = require('fs');

fs.readFile('data.json', 'utf8',(err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const jsonData = JSON.parse(data);
    console.log(jsonData);
});
 
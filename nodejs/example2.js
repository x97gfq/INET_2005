const fs = require('fs');

const data = {
    name: 'Jane Doe',
    age: 25,
    city: 'Los Angeles'
};

fs.writeFile('output.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File has been written');
});

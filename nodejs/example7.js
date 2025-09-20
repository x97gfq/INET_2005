const fs = require('fs');

fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const users = JSON.parse(data);
    let totalAge = 0;
    const cityCount = {};

    users.forEach(user => {
        totalAge += user.age;
        if (cityCount[user.city]) {
            cityCount[user.city]++;
        } else {
            cityCount[user.city] = 1;
        }
    });

    const averageAge = totalAge / users.length;
    console.log(`Average Age: ${averageAge.toFixed(2)}`);
    console.log('Number of users from each city:', cityCount);
});

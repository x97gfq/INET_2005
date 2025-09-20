const fs = require('fs');

fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const products = JSON.parse(data);
    let totalInventoryValue = 0;
    const categoryCount = {};

    products.forEach(product => {
        totalInventoryValue += product.price * product.quantity;
        if (categoryCount[product.category]) {
            categoryCount[product.category]++;
        } else {
            categoryCount[product.category] = 1;
        }
    });

    console.log(`Total Inventory Value: $${totalInventoryValue}`);
    console.log('Number of products in each category:', categoryCount);
});

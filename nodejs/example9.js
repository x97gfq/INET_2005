const fs = require('fs');

fs.readFile('sales.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const sales = JSON.parse(data);
    let totalSalesAmount = 0;
    const productCount = {};

    sales.forEach(sale => {
        totalSalesAmount += sale.amount;
        if (productCount[sale.product]) {
            productCount[sale.product]++;
        } else {
            productCount[sale.product] = 1;
        }
    });

    console.log(`Total Sales Amount: $${totalSalesAmount}`);
    console.log('Number of sales per product:', productCount);
});

const fs = require('node:fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data.json');

async function readData() {
    let data = await fs.readFile(filePath, 'utf-8');

    return JSON.parse(data);
}

async function writeData(products) {
    await fs.writeFile(
        filePath,
        JSON.stringify(products, null, 2)
    );
}

module.exports = {
    readData,
    writeData
};
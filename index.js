const express = require('express');
const app = express();
const fs = require('node:fs/promises');
const path = require('path')
const filePath = path.join(__dirname, 'data.json');
app.use(express.json());

async function readData() {
    let data = await fs.readFile(filePath,'utf-8')
    return JSON.parse(data)
}

async function delayReadData(){
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,1500)
    })
    return await readData();
}

app.get('/products', async (req,res)=>{
    try{
        let products = await delayReadData();
        res.json(products);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
    
})

app.get('/products/:id', async (req, res) => {
    try{
        let id = Number(req.params.id);
        let products = await delayReadData();
        let data = products.find((item => item.id === id));
        res.json(data);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
});
app.listen(3000);





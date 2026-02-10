const express = require('express');
const app = express();
const port = 3000;


let catalogs = [
{id: 1, title: 'шоколадка', price: 100},
{id: 2, title: 'печенька', price: 200},
{id: 3, title: 'вода', price: 100},
];


app.use(express.json());


app.get('/', (req, res) => {
res.send('Главная страница магазина');
});



app.post('/catalogs', (req, res) => {
const { title, price } = req.body;


const newCatalog = {
id: Date.now(),
title,
price
};


catalogs.push(newCatalog);
res.status(201).json(newCatalog);
});


app.get('/catalogs', (req, res) => {
res.json(catalogs);
});



app.get('/catalogs/:id', (req, res) => {

const catalog = catalogs.find(u => u.id == req.params.id);


if (!catalog) {
return res.status(404).send('Товар не найден');
}

res.json(catalog);
});


app.patch('/catalogs/:id', (req, res) => {
const catalog = catalogs.find(u => u.id == req.params.id);

if (!catalog) {
return res.status(404).send('Товар не найден');
}


const { title, price } = req.body;


if (title !== undefined) catalog.title = title;
if (price !== undefined) catalog.price = price;


res.json(catalog);
});


app.delete('/catalogs/:id', (req, res) => {
catalogs = catalogs.filter(u => u.id != req.params.id);
res.send('Ok');
});


app.listen(port, () => {
console.log(`Сервер запущен на http://localhost:${port}`);
});
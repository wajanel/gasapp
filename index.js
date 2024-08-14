const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {dbConnection} = require('./database/config');

const app = express();

app.use( express.static('public'))

dbConnection();
 
app.use(cors());

//necesario para poder capturar el body
app.use(express.json())

app.use('/api/branch', require('./routes/branch'));
app.use('/api/pump', require('./routes/pump'));
app.use('/api/provider', require('./routes/provider'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/income-type', require('./routes/incomeType'))
app.use('/api/income', require('./routes/income'))
app.use('/api/fuel-type', require('./routes/fuelType'))
app.use('/api/measure-fuel', require('./routes/measureFuel'))
app.use('/api/purchase-fuel', require('./routes/purchaseFuel'))
app.use('/api/purchase-fuel-resume', require('./routes/purchaseFuelResume'))
app.use('/api/expenses-type', require('./routes/expensesType'))
app.use('/api/expenses', require('./routes/expenses'))
app.use('/api/fuel-pump', require('./routes/fuelPump'))
app.use('/api/fuel-price', require('./routes/fuelPrice'))
app.use('/api/sale-fuel', require('./routes/saleFuel'))
app.use('/api/procedures', require('./routes/procedures'));
app.use('/api/closing', require('./routes/closing'));

app.listen('4002', ()=>{
    console.log('Ejecución servicio en puerto 4002');
})
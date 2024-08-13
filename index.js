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

app.use('/branch', require('./routes/branch'));
app.use('/pump', require('./routes/pump'));
app.use('/provider', require('./routes/provider'));
app.use('/auth', require('./routes/auth'));
app.use('/income-type', require('./routes/incomeType'))
app.use('/income', require('./routes/income'))
app.use('/fuel-type', require('./routes/fuelType'))
app.use('/measure-fuel', require('./routes/measureFuel'))
app.use('/purchase-fuel', require('./routes/purchaseFuel'))
app.use('/purchase-fuel-resume', require('./routes/purchaseFuelResume'))
app.use('/expenses-type', require('./routes/expensesType'))
app.use('/expenses', require('./routes/expenses'))
app.use('/fuel-pump', require('./routes/fuelPump'))
app.use('/fuel-price', require('./routes/fuelPrice'))
app.use('/sale-fuel', require('./routes/saleFuel'))
app.use('/procedures', require('./routes/procedures'));
app.use('/closing', require('./routes/closing'));

app.listen('4002', ()=>{
    console.log('Ejecución servicio en puerto 4002');
})
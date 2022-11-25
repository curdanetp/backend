const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const taskRoutes = require('./routes/tasks.routes')
const {DB_Init} = require('./dbini')
const {service}=require ('./config');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(taskRoutes);

app.use((err, req, res, next) => {
    console.log(err.message);
    return res.status(500).json({"message": err.message});
});
console.log('Verifying Database & Tables')
//Verify if database & table exists
DB_Init();
console.log(`Server on port ${service.port}`);

app.listen(service.port);


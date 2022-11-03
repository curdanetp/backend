const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const taskRoutes = require('./routes/tasks.routes')

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(taskRoutes);

app.use((err, req, res, next) => {
    console.log(err.message);
    return res.status(500).json({"message": err.message});
});
app.listen(4000);
console.log('Server on port 4000');
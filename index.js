const express = require("express");
const cors = require('cors');
const errorHandler = require('./server/middleware/error');

const app = express();

app.use(express.json());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const user = require('./server/routes/user');

app.use('/api/user', user);

app.use(errorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
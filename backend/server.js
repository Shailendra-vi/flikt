const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./dbconfig.js');
const controller = require('./controller.js')

const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.post('/register', controller.register);
app.post('/login', controller.login);

app.delete('/users/:id', controller.deleteUser);
app.put('/update-users/:id', controller.updateUser);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

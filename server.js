const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const app = express();
mongoose.connect('mongodb+srv://botuns:qqqqqqqqq@cluster0.xoxxhtw.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error(error);
});
app.use(express.json());
app.use(cors());
// app.use(authMiddleware)
app.use('/app',routes)

const port = process.env.PORT || 4000;

app.listen(port,'0.0.0.0', () => {
  console.log(`Server is listening on port ${port}`);
});






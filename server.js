const { app } = require('./app');

//models
const { initModel } = require('./models/initModel');

//utils
const { database } = require('./utils/database');

// Authenticate database credentials
database
  .authenticate()
  .then(() => console.log('Database authenticated successfully'))
  .catch((err) => console.log(err));

// Establish models relations
initModel();

// Establish models relations
database
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

// Spin up server
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`);
});

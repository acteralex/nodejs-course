const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on(
  'error',
  console.error.bind(console, 'Mongo connection error:')
);

mongoose.connection.on('open', async () => {
  console.log('mongodb is connected.');
  // console.log('Database is dropping...');

  // mongoose.connection.dropDatabase()
  //   .then(() => console.log('Database is dropped.'))
  //   .catch(() => console.log('Error when database was dropping.'));
});

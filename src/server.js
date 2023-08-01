require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('Database connected 🫡'))
  .catch((err) => console.log(err));

db.sync({ force: false })
  .then(() => console.log('Database syncronized 👌'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up un port ${PORT}`);
});

require('dotenv').config();
const config = require('./utils/config');
const db = require('../db/models');
const sequelize = db.sequelize;
const app = require('./server');

const port = config.PORT;
sequelize
    .authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));
app.listen(port, () => {
    console.log(`Running on port ${config.PORT} in ${config.NODE_ENV} env`);
});



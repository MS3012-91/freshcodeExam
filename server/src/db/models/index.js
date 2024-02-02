const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath =
  env === 'production'
    ? path.join(
        __dirname,
        '..',
        '..',
        '..',
        'src/server/config/postgresConfig.json'
      )
    : path.join(__dirname, '..', '/config/postgresConfig.json');
const config = require(configPath)[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db['Contest'].belongsTo(db['User'], {
  foreignKey: 'userId',
  sourceKey: 'id',
});
db['Contest'].hasMany(db['Offer'], {
  foreignKey: 'contestId',
  targetKey: 'id',
});

db['User'].hasMany(db['Offer'], { foreignKey: 'userId', targetKey: 'id' });
db['User'].hasMany(db['Contest'], { foreignKey: 'userId', targetKey: 'id' });
db['User'].hasMany(db['Rating'], { foreignKey: 'userId', targetKey: 'id' });

db['Offer'].belongsTo(db['User'], { foreignKey: 'userId', sourceKey: 'id' });
db['Offer'].belongsTo(db['Contest'], {
  foreignKey: 'contestId',
  sourceKey: 'id',
});
db['Offer'].hasOne(db['Rating'], { foreignKey: 'offerId', targetKey: 'id' });

db['Rating'].belongsTo(db['User'], { foreignKey: 'userId', targetKey: 'id' });
db['Rating'].belongsTo(db['Offer'], {
  foreignKey: 'offerId',
  targetKey: 'id',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

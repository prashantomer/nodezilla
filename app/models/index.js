const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const config = require(path.join(process.cwd(), 'configs/sequelizeConfig.js'))[process.env.NODE_ENV];
const sequelize = new Sequelize(config);


const models = {};
models.sequelize = sequelize;
models.Sequelize = Sequelize;

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    const modelName = path.basename(file, '.js');
    const formattedName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    // console.log(`Loading model: ${modelName}(${formattedName})`, model);
    models[formattedName] = model(sequelize, Sequelize.DataTypes);
  });

module.exports = models;

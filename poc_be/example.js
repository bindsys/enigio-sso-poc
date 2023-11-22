const PeopleRepository = require('./server/repository/PeopleRepository');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const fetchPeople = async (query = {}) => {
  const repository = new PeopleRepository();

  return await repository.getAll(query);
};

module.exports = { fetchPeople };

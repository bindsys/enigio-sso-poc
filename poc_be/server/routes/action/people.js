const PeopleRepository = require('../../repository/PeopleRepository');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.index = async (req, res) => {
    const repository = new PeopleRepository();
    let query = {};
    const params = req.query;
    if (params) {
        const keys = Object.keys(params);
        const value = {};
        keys.forEach(item => {
            let v = params[`${item}`];
            value[`${item}`] = {
                [Op.like]: `%${v}%`
            }
        });
        query = {...value};
    }

    const people = await repository.getAll(query);
    res.send(people);
};


exports.index = async (req, res) => {
    const people = await People.findAll();
    console.log(people);
    res.send('forum index');
};

exports.new = async (req, res) => {
    res.send('new forum');
};

exports.create = async (req, res) => {
    res.send('create forum');
};

exports.show = async (req, res) => {
    res.send('show forum ' + req.forum.title);
};

exports.edit = async (req, res) => {
    res.send('edit forum ' + req.forum.title);
};

exports.update = async (req, res) => {
    res.send('update forum ' + req.forum.title);
};

exports.destroy = async (req, res) => {
    res.send('destroy forum ' + req.forum.title);
};

exports.load = function(id, fn) {
    process.nextTick(function(){
        fn(null, { title: 'Ferrets' });
    });
};

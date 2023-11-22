const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const {Op} = require("sequelize");
const url = require('url');
const querystring = require('querystring');
const PeopleRepository = require('../repository/PeopleRepository');

router.get('/api/v1/:model', async (req, res) => {
    const m = req.params['model'];
    if (!m) throw Error('Input params is not correctly');
    const repository = new PeopleRepository();
    const {option, filter} = req.query
    console.log(filter);
    console.log(option);
    const w = {}
    if (filter) {
        const t = new Map(Object.entries(filter));
        t.forEach((key, tt_) => {
            const keyword = Object.keys(key);
            const map = new Map(Object.entries(key));
            keyword.forEach(item => {
                w[`${tt_}`] = {
                    [Op[`${item}`]]: map.get(item)
                }
            })
        });
    }
    let queryOptions = {}
    if (option) {
        const optionP = new Map(Object.entries(option));
        optionP.forEach((content, tt_) => {
            if (tt_ !== 'include') {
                queryOptions[`${tt_}`] = content;
            }
            else if (tt_ === 'include') {
                if (Array.isArray(content)) {
                    const entries = {};
                    content.forEach(item => {
                        const ko = Object.keys(item);
                        const map = new Map(Object.entries(item));
                        ko.forEach(k => {
                            if (k === 'model') {
                                const v = map.get(k);
                                if (typeof v === 'string')
                                    entries['model'] = db[`${v}`];
                                else {
                                }
                            } else {
                                entries[`${k}`] = map.get(k)
                            }
                        })
                    });
                    console.log(entries)
                    queryOptions['include'] = entries;
                }
            }
        });
    }

    const results = await repository.getAll(w, queryOptions);
    res.send(results);
});


router.post('/api/v1/:model/create', async (req, res) => {
    const m = req.params['model'];
    if (!m) throw Error('Input params is not correctly');
    const model = db[m];
    const body = req.body;
    const results = await model.create(body);
    res.send(results);
});

router.put('/api/v1/:model/edit', async (req, res) => {
    const m = req.params['model'];
    if (!m) throw Error('Input params is not correctly');
    const model = db[m];
    const body = req.body();
    const results = await model.update({
        ...body,
    }, {
        returning: true, where: {id: body.id}
    });
    res.send(results);
});

router.get('/api/v1/:model/:id', async (req, res) => {
    const m = req.params['model'];
    const id = req.params['id'];
    if (!m) throw Error('Input params is not correctly');
    const model = db[m];
    const results = await model.findOne({
        id: id
    });
    res.send(results);
});

module.exports = router;

const db = require('../../../db/models');
const { People } = require('../../../db/models');
exports.index = async (req, res) => {
    const model = db['people'];
    console.log(model);
    const rs_ = await model.findAll();
    console.log(rs_);
    res.send('main index');
}




const path = require("path");
const fs = require("fs");
const basename = path.basename(__filename);
const db_ = {};
const current_router = require('path').basename(__dirname);
const express = require("express");
const router = express.Router();

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        );
    })
    .forEach(file => {
        const extension = path.extname(file);
        const f = path.basename(file,extension);
        db_[f] = `./${current_router}/${f}`;
        router.use(require(`./${f}`));
    });

module.exports = router;

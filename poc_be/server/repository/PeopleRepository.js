const db = require('../../db/models');
const {Op} = require("sequelize");
const sequelize = db.sequelize;
const People = db.people;

class PeopleRepository {
    constructor() {
        this.sequelize = sequelize;
    }

    async create(data, transaction = null) {
        try {
            console.info(`PeopleRepository ### create new People`);
            return await People.create(data, transaction ?  {transaction: transaction} : {});
        } catch (err) {
            console.error('PeopleRepository ## create new People failed', {
                error: err.message,
            });
            throw err;
        }
    }

    async bulkCreate(data, transaction) {
        try {
            console.info(`PeopleRepository ### bulkCreate`);
            return await People.bulkCreate(
                data,
                transaction ? {transaction: transaction} : {},
            );
        } catch (e) {
            console.error(
                'PeopleRepository ## fetch failed',
                {
                    error: e.message,
                },
            );
            throw e;
        }
    }

    async update(conditions, attrs, t) {
        console.info(`PeopleRepository ### Update Peoples`);
        const updateQuery = {
            ...conditions,
        };
        await People.update(
            {...attrs},
            {
                returning: true,
                where: updateQuery,
                transaction: t,
            },
        );
    }

    async delete(conditions, t) {
        console.info(`PeopleRepository ### delete Key`);
        await People.destroy({
            where: {
                ...conditions,
            },
            transaction: t,
        } )
    }

    /**
     * getAll
     * [NCID-392] API - Get All Peoples
     *
     * @param {*} filters filters
     * @param {*} queryOptions
     * @returns {*}  All PeopleWithParams
     */
    // eslint-disable-next-line no-dupe-class-members
    async getAll(filters, queryOptions = {}) {
        console.log(`PeopleRepository ### fetch`, filters);
        const {attributes} = queryOptions;
        const {order} = queryOptions;
        const {include} = queryOptions;
        const {option} = queryOptions;
        try {
            const query = {
                where: {...filters},
                distinct: true,
                ...(attributes ? {attributes} : {}),
                ...(order ? [order] : []),
                ...(include ? {include} : {})
            };
            // It should be a trick. We should create a method to get count in repository layer
            if (!option || option === 0)
                return await People.findAll(query);
            else
                return await People.findAndCountAll(query);
        } catch (err) {
            console.error(
                'PeopleRepository ## fetch failed',
                {
                    error: err.message,
                },
            );
            throw err;
        }
    }


    // async getAll(filters, queryOptions = {}) {
    //     console.log(`PeopleRepository ### fetch`, filters);
    //     const {attributes} = queryOptions;
    //     const {order} = queryOptions;
    //     const {include} = queryOptions;
    //     const {option} = queryOptions;
    //     try {
    //         const query = {
    //             firstName: {
    //                 [Op.eq]: 'Linh'
    //             }
    //         }
    //
    //
    //         // const query = {
    //         //     'firstName': {
    //         //         'Op.eq': 'Linh'
    //         //     }
    //         // }
    //         return await People.findAndCountAll(query);
    //     } catch (err) {
    //         console.error(
    //             'PeopleRepository ## fetch failed',
    //             {
    //                 error: err.message,
    //             },
    //         );
    //         throw err;
    //     }
    // }

    /**
     * getPeopleById
     * getPeople
     *
     * @param {*} credentialId credentialId
     * @returns {*} People
     */

    // eslint-disable-next-line no-dupe-class-members
    async get(filters, queryOptions = {}) {
        const {attributes, order, include} = queryOptions;
        console.info(`PeopleRepository ### get`);
        try {
            const query = {
                where: {
                    ...filters,
                },
                ...(attributes ? {attributes} : {}),
                ...(order ? [order] : []),
                ...(include ? {include} : {})
            };
            return await People.findOne(query);
        } catch (err) {
            console.error('PeopleRepository ## get failed', {
                error: err.message,
            });
            throw err;
        }
    }

    async commit(t) {
        console.info(`PeopleRepository.commit`);
        await t.commit();
    }
}

module.exports = PeopleRepository;

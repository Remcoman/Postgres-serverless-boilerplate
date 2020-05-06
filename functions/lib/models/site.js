const { Model } = require('objection');

module.exports = class Site extends Model {
    static tableName = 'sites';

    static jsonSchema = {
        required: [
            'name',
            'host'
        ],
        properties: {
            name: {
                type: 'string'
            },
            host: {
                type: 'string'
            }
        }
    }
}
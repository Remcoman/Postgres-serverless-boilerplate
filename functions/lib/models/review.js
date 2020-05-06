
const { Model } = require('objection');

module.exports = class Review extends Model {
    static tableName = 'reviews';

    static jsonSchema = {
        required: [
            'url',
            'score',
        ],
        properties: {
            url: {
                type: 'string'
            },
            score: {
                type: 'number',
                minimum: 1,
                maximum: 10,
            },
        }
    }

    static get relationMappings() {
        const Site = require('./site');

        return {
            site: {
                modelClass: Site,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'reviews.siteId',
                    to: 'sites.id',
                }
            }
        }
    }
}
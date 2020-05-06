const { Model } = require('objection');

module.exports = class Game extends Model {
    static tableName = 'games';

    static jsonSchema = {
        required: [
            'name',
        ],
        properties: {
            name: {
                type: 'string'
            },
            image: {
                type: 'string'
            }
        }
    }

    static get relationMappings() {
        const Review = require('./review');

        return {
            reviews: {
                modelClass: Review,
                relation: Model.HasManyRelation,
                join: {
                    from: 'reviews.siteId',
                    to: 'games.id',
                }
            }
        }
    }
}
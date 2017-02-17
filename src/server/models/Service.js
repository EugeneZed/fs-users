import { Model } from 'objection';

export default class Service extends Model {
  // Table name is the only required property.
  static tableName = 'services';

  // This object defines the relations to other models.
  static relationMappings = {
    teams: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Permission',
      join: {
        from: 'services.id',
        to: 'service_permissions.serviceID'
      }
    }
  };
}

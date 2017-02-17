import { Model } from 'objection';

export default class LocalAuth extends Model {
  // Table name is the only required property.
  static tableName = 'local_auth';

  // This object defines the relations to other models.
  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'users.id',
        to: 'local_auth.userID'
      }
    }
  };
}

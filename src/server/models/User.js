import { Model } from 'objection';

export default class User extends Model {
  // Table name is the only required property.
  static tableName = 'users';

  // This object defines the relations to other models.
  static relationMappings = {
    teams: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Team',
      join: {
        from: 'users.id',
        // ManyToMany relation needs the `through` object
        // to describe the join table.
        through: {
          // If you have a model class for the join table
          // you need to specify it like this:
          // modelClass: PersonMovie,
          from: 'user_teams.userID',
          to: 'user_teams.teamNumber',
          modelClass: __dirname + '/UserTeam'
        },
        to: 'teams.teamNumber'
      }
    },
    localAuth: {
      relation: Model.HasOneRelation,
      modelClass: __dirname + "/LocalAuth",
      join: {
        from: 'users.id',
        to: 'local_auth.userID'
      }

    }
  };
}

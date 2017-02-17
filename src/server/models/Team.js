import { Model } from 'objection';

export default class Team extends Model {
  // Table name is the only required property.
  static tableName = 'teams';

  // This object defines the relations to other models.
  static relationMappings = {
    user: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'teams.teamNumber',
        // ManyToMany relation needs the `through` object
        // to describe the join table.
        through: {
          // If you have a model class for the join table
          // you need to specify it like this:
          // modelClass: PersonMovie,
          from: 'user_teams.teamNumber',
          to: 'user_teams.userID',
          modelClass: __dirname + '/UserTeam'
        },
        to: 'users.id'
      }
    },
    roles: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + "/Role",
      join: {
        from : "teams.teamNumber",
        to: "team_roles.teamNumber"
      }
    }
  };
}

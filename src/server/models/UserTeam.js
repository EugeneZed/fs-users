import { Model } from 'objection';

export default class UserTeam extends Model {
  // Table name is the only required property.
  static tableName = 'user_teams';

  // This object defines the relations to other models.
  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'users.id',
        to: 'user_teams.userID'
      }
    },
    team: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Team',
      join: {
        from: 'team.teamNumber',
        to: 'user_teams.teamNumber'
      }
    },
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Role',
      join: {
        from: 'user_teams.id',
        // ManyToMany relation needs the `through` object
        // to describe the join table.
        through: {
          // If you have a model class for the join table
          // you need to specify it like this:
          // modelClass: PersonMovie,
          from: 'user_team_roles.userTeamID',
          to: 'user_team_roles.roleID'
        },
        to: 'team_roles.id'
      }
    },
    permissions: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Permission',
      join: {
        from: 'user_teams.id',
        // ManyToMany relation needs the `through` object
        // to describe the join table.
        through: {
          // If you have a model class for the join table
          // you need to specify it like this:
          // modelClass: PersonMovie,
          from: 'user_team_permissions.userTeamID',
          to: 'user_team_permissions.permissionID'
        },
        to: 'service_permissions.id'
      }
    }
  };
}

import { Model } from 'objection';

export default class Role extends Model {
  // Table name is the only required property.
  static tableName = 'team_roles';

  // This object defines the relations to other models.
  static relationMappings = {
    teams: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Team',
      join: {
        from: 'teams.teamNumber',
        to: 'team_roles.teamNumber'
      }
    },
    userTeams: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/UserTeam',
      join: {
        from: 'team_roles.id',
        // ManyToMany relation needs the `through` object
        // to describe the join table.
        through: {
          // If you have a model class for the join table
          // you need to specify it like this:
          // modelClass: PersonMovie,
          from: 'user_team_roles.roleID',
          to: 'user_team_roles.userTeamID'
        },
        to: 'user_teams.id'
      }
    },
    permissions: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Permission',
      join: {
        from: 'team_roles.id',
        // ManyToMany relation needs the `through` object
        // to describe the join table.
        through: {
          // If you have a model class for the join table
          // you need to specify it like this:
          // modelClass: PersonMovie,
          from: 'team_role_permissions.roleID',
          to: 'team_role_permissions.permissionID'
        },
        to: 'service_permissions.id'
      }
    }
  };
}

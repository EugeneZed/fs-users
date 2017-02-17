import { Model } from 'objection';

export default class Permission extends Model {
  // Table name is the only required property.
  static tableName = 'service_permissions';

  // This object defines the relations to other models.
  static relationMappings = {
    services: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Service',
      join: {
        from: 'services.id',
        to: 'service_permissions.serviceID'
      }
    },
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Role',
      join: {
        from: 'service_permissions.id',
        // ManyToMany relation needs the `through` object
        // to describe the join table.
        through: {
          // If you have a model class for the join table
          // you need to specify it like this:
          // modelClass: PersonMovie,
          from: 'team_role_permissions.permissionID',
          to: 'team_role_permissions.roleID'
        },
        to: 'team_roles.id'
      }
    },
    userTeams: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/UserTeam',
      join: {
        from: 'service_permissions.id',
        // ManyToMany relation needs the `through` object
        // to describe the join table.
        through: {
          // If you have a model class for the join table
          // you need to specify it like this:
          // modelClass: PersonMovie,
          from: 'user_team_permissions.permissionID',
          to: 'user_team_permissions.userTeamID'
        },
        to: 'user_teams.id'
      }
    }
  };
}

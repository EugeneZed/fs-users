exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable("users",(table) =>{
      table.increments().primary();
    }),

    knex.schema.createTable("local_auth",(table)=>{
      table.increments().primary();
      table.integer("userID")
           .unsigned()
           .notNullable()
           .references("id")
           .inTable("users");
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
      table.string("email").notNullable();
    }),

    knex.schema.createTable("teams",(table)=>{
      table.integer("teamNumber").unsigned().primary();
      table.string("teamName").notNullable();
    }),

    knex.schema.createTable("user_teams",(table)=>{
      table.increments().primary()
      table.integer("userID")
           .unsigned()
           .notNullable()
           .references("id")
           .inTable("users");
       table.integer("teamNumber")
            .unsigned()
            .notNullable()
            .references("teamNumber")
            .inTable("teams");
      table.unique(['userID', 'teamNumber'])
    }),

    knex.schema.createTable("services",(table)=>{
      table.increments().primary()
      table.string("name").notNullable();
    }),

    knex.schema.createTable("service_permissions",(table)=>{
      table.increments().primary()
      table.integer("serviceID")
           .unsigned()
           .notNullable()
           .references("id")
           .inTable("services");
      table.string("name").notNullable();
      table.unique(['name', 'serviceID'])
    }),

    knex.schema.createTable("team_roles",(table)=>{
      table.increments().primary()
      table.integer("teamNumber")
           .unsigned()
           .notNullable()
           .references("teamNumber")
           .inTable("teams");
      table.string("title").notNullable();
      table.unique(['title', 'teamNumber'])
    }),

    knex.schema.createTable("team_role_permissions",(table)=>{
      table.increments().primary()
      table.integer("teamRoleID")
           .unsigned()
           .notNullable()
           .references("id")
           .inTable("team_roles");
      table.integer("servicePermissionID")
           .unsigned()
           .notNullable()
           .references("id")
           .inTable("service_permissions");
      table.unique(['teamRoleID', 'servicePermissionID'])
    }),

    knex.schema.createTable("user_team_permissions",(table)=>{
      table.increments().primary()
      table.integer("userTeamID")
           .unsigned()
           .notNullable()
           .references("id")
           .inTable("user_teams");
      table.integer("servicePermissionID")
           .unsigned()
           .notNullable()
           .references("id")
           .inTable("service_permissions");
      table.unique(['userTeamID', 'servicePermissionID'])
    }),

    knex.schema.createTable("user_team_roles",(table)=>{
      table.increments().primary()
      table.integer("userTeamID")
           .unsigned()
           .notNullable()
           .references("id")
           .inTable("user_teams");
      table.integer("teamRoleID")
           .unsigned()
           .notNullable()
           .references("id")
           .inTable("team_roles");
      table.unique(['userTeamID', 'teamRoleID'])
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("user_team_permissions"),
    knex.schema.dropTable("team_role_permissions"),
    knex.schema.dropTable("team_roles"),
    knex.schema.dropTable("service_permissions"),
    knex.schema.dropTable("services"),
    knex.schema.dropTable("user_teams"),
    knex.schema.dropTable("teams"),
    knex.schema.dropTable("local_auth"),
    knex.schema.dropTable("users")
  ])

};

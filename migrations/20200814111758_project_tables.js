
exports.up = function(knex) {
    return knex.schema
      .createTable('projects', tbl => {
          tbl.increments('project_id');
          tbl.text('project_name', 200).notNullable();
          tbl.text('project_description', 1000);
          tbl.boolean('project_completed').notNullable().defaultTo('false');
      })
      .createTable('tasks', tbl => {
          tbl.increments('task_id');
          tbl.text('task_description', 1000).notNullable();
          tbl.text('notes', 1000);
          tbl.integer('project_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('projects')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          tbl.boolean('task_completed').notNullable().defaultTo('false');
      })
      .createTable('resources', tbl => {
          tbl.increments('resource_id');
          tbl.text('resource_name', 100).notNullable().unique();
          tbl.text('resource_description', 1000)
      })
      .createTable('project_resources', tbl => {
          tbl.increments();
          tbl.integer('projectId')
              .notNullable()
              .references('project_id')
              .inTable('projects')
              .onUpdate("CASCADE")
              .onDelete("CASCADE");
          tbl.integer('resourceId')
              .notNullable()
              .references('resource_id')
              .inTable('resources')
              .onUpdate("CASCADE")
              .onDelete("CASCADE");
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('projects')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('project_resources');
  };
  

exports.up = function(knex) {
  return knex.schema
    .createTable('project', tbl=>{
        tbl.increments();
        tbl.string('name').notNullable();
        tbl.text('description');
        tbl.boolean('completed').notNullable().defaultTo(false);
    })
    .createTable('task', tbl =>{
        tbl.increments();
        tbl.string('task').notNullable();
        tbl.text('notes');
        tbl.boolean('completed').notNullable().defaultTo(false);
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('project');
    })
    .createTable('resource', tbl=>{
        tbl.increments();
        tbl.string('name').notNullable();
        tbl.text('description');
    })
    .createTable('projects', tbl=>{
        tbl.increments();
        tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('project');
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('resource');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("project")
    .dropTableIfExists("task")
    .dropTableIfExists("resource")
    .dropTableIfExists('projects');
};

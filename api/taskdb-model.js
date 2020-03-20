const db = require("../data/dbConfig");

module.exports = {
  addResource,
  getResources,
  addProject,
  getProjects,
  addTask,
  getTasks
};

function addResource(res) {
  return db("resource")
    .insert(res, "id")
    .then(ids => {
      const [id] = ids;
      return getResourcesById(id);
    });
}

function getResourcesById(id) {
  return db("resource")
    .where({ id })
    .first();
}

function getResources(){
  return db('resource');
}

function addProject(proj) {
  return db("project")
    .insert(proj, "id")
    .then(ids => {
      const [id] = ids;
      return getProjectsByID(id);
    });
}

function getProjectsByID(id) {
  return db("project")
    .where({ id })
    .first();
}

function getProjects(){
  return db('project');
}

function addTask(task) {
  return db("task")
    .insert(task, "id")
    .then(ids => {
      const [id] = ids;
      return getTasksById(id);
    });
}

function getTasksById(id) {
  return db("task")
    .where({ id })
    .first();
}

function getTasks(id){
  return db('project as p')
    .join('task as t', 't.project_id', 'p.id')
    .select(
      'p.name',
      'p.description',
      't.task',
      't.notes',
      't.completed'
    )
    .where({project_id: id})

}

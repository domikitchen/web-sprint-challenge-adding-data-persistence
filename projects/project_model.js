const db = require('../data/db-config.js');
const { fn } = require('../data/db-config.js');

module.exports = {
    getProjects,
    getProjectById,
    getProjectTasks,
    getTasks,
    getProjectResourcesById,
    getResources,
    addResource,
    addNewProject,
    addNewTask,
    addNewResourceToProject
}

function getProjects() {
    return db('projects');
};

function getProjectById(id) {
    return db('projects').where({ project_id: id }).first();
};

function getProjectTasks(id) {
    return db('tasks')
        .join('projects', 'tasks.project_id', "=", 'projects.project_id')
        .select('projects.project_name', 'projects.project_description', 'tasks.task_id', 'tasks.task_description', 'tasks.notes', 'tasks.task_completed')
        .where({ 'tasks.project_id': id })
        .orderBy('tasks.task_id');
};

function getTasks() {
    return db('tasks');
};

function getProjectResourcesById(id) {
    return db('project_resources')
        .join('resources', 'project_resources.resourceId', "=", 'resources.resource_id')
        .join('projects', 'project_resources.projectId', "=", 'projects.project_id')
        .select('resources.resource_name', 'projects.project_name')
        .where({ project_id: id });
};

function getResources() {
    return db('resources');
};

function addResource(resource) {
    return db('resources').insert(resource).returning('resource_id').then(ids => {
        return db('resources').where({ resource_id: ids }).first();
    });
};

function addNewProject(newProject) {
    return db('projects').insert(newProject).returning('id').then(ids => {
        return getProjectById(ids[0]);
    });
};

function addNewTask(newTask, id) {
    newTask.project_id = id;

    return db('tasks').insert(newTask).returning('task_id').then(ids => {
        return db('tasks').where({ task_id: ids }).first();
    });
};

function addNewResourceToProject(newResource, id) {
    
}
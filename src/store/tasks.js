import { action, makeObservable, observable, toJS } from "mobx";

class TasksStore {
  label = "دیجی اکسپرس‌";

  // TODO - design the data model
  tasks = [
    {
      title: "new task",
      id: 1,
      subTasks: [
        {
          title: "sub task 1",
          id: 2,
          parentId: 1,
          subTasks: [
            {
              title: "sub task 2",
              id: 3,
              parentId: 2,
              subTasks: [],
            },
          ],
        },
      ],
    },
  ];

  constructor() {
    makeObservable(this, {
      label: observable,
      tasks: observable,
      addTask: action,
      deleteTask: action,
      getTaskById: action,
      updateTask: action,
    });
  }

  // TODO - add needed methods to manipulate 'tasks'

  // Get task by id for other action
  getTaskById(taskId) {
    const findTask = (tasks, taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        return task;
      }
      for (const subTask of tasks) {
        if (subTask.subTasks && subTask.subTasks.length) {
          const foundTask = findTask(subTask.subTasks, taskId);
          if (foundTask) {
            return foundTask;
          }
        }
      }
      return null;
    };

    return findTask(this.tasks, taskId);
  }

  // Add action
  addTask(task) {
    const parentTask = this.getTaskById(task.parentId);
    if (parentTask) {
      parentTask.subTasks.push(task);
    }
  }

  // Delete action
  deleteTask(taskId) {
    const taskToDelete = this.getTaskById(taskId);
    if (taskToDelete) {
      const parentTask = this.getTaskById(taskToDelete.parentId);
      if (parentTask) {
        parentTask.subTasks = parentTask.subTasks.filter(
          (subTask) => subTask.id !== taskId
        );
      } else {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      }
    }
  }

  // Update title action
  updateTask(taskId, newValue) {
    const taskToUpdate = this.getTaskById(taskId);
    if (taskToUpdate) {
      taskToUpdate.title = newValue; // Update the title
    }
  }
}

export default new TasksStore();

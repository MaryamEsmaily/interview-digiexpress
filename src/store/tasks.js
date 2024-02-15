import { action, makeObservable, observable } from "mobx";
import { toast } from "react-toastify";

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
      moveTask: action,
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

  // Move task
  moveTask(taskId, parentId, direction) {
    // Find task
    const parentTask = this.getTaskById(parentId);
    // Check that is not main task
    if (!parentTask) {
      toast("This is the main task!");
      return;
    }

    const index = parentTask.subTasks.findIndex((task) => task.id === taskId);

    // Check direction
    if (direction === "down" && index < parentTask.subTasks.length - 1) {
      // Move to down
      const temp = parentTask.subTasks[index];
      parentTask.subTasks[index] = parentTask.subTasks[index + 1];
      parentTask.subTasks[index + 1] = temp;
    } else if (direction === "up" && index > 0) {
      // Move to up
      const temp = parentTask.subTasks[index];
      parentTask.subTasks[index] = parentTask.subTasks[index - 1];
      parentTask.subTasks[index - 1] = temp;
    } else {
      toast(
        direction === "down" ? "Task is at the bottom." : "Task is at the top."
      );
    }
  }
}

export default new TasksStore();

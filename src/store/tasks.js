import { action, makeObservable, observable } from "mobx";

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

  addTask(task) {
    const checkTasks = () => {
      const mapOverTaskList = (data) => {
        data?.forEach((item) => {
          if (task.parentId === item.id) {
            item.subTasks.push(task);
          } else if (item?.subTasks.length) {
            mapOverTaskList(item?.subTasks);
          }
        });
      };
      mapOverTaskList(this.tasks);
    };
    checkTasks();
  }

  deleteTask(taskId) {
    const deleteX = (tasks, taskId) => {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
          tasks.splice(i, 1);
          return true;
        }
        if (tasks[i].subTasks && tasks[i].subTasks.length) {
          if (deleteX(tasks[i].subTasks, taskId)) {
            return true;
          }
        }
      }
      return false;
    };

    deleteX(this.tasks, taskId);
  }
}

export default new TasksStore();

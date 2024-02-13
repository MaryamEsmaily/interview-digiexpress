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
          id: 4,
          parentId: 1,
          subTasks: [
            {
              title: "sub task 1",
              id: 5,
              parentId: 4,
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
    });
  }

  // TODO - add needed methods to manipulate 'tasks'
}

export default new TasksStore();

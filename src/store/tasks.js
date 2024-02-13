import { makeObservable, observable } from "mobx";

class TasksStore {
  label = "دیجی اکسپرس‌";

  // TODO - design the data model
  tasks = undefined;

  constructor() {
    makeObservable(this, {
      label: observable,
      tasks: observable,
    });
  }

  // TODO - add needed methods to manipulate 'tasks'
}

export default new TasksStore();

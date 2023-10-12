export const SessionStorage = {
  getTasks() {
    const tasks = sessionStorage.getItem("_tasks");

    if (tasks) {
      return JSON.parse(tasks);
    }
    return [];
  },
  setTasks(tasks) {
    if (tasks) {
      sessionStorage.setItem("_tasks", JSON.stringify(tasks));
    }
  },
};

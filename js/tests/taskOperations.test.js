import {
  addTasks,
  deleteTask,
  filterTasks,
  sortTasks,
} from "../taskOperations.js";
import {
  setTasksFromLocalStorageAndRender,
  getTasksFromLocalStorage,
} from "../storageUtils.js";

jest.mock("../storageUtils", () => ({
  getTasksFromLocalStorage: jest.fn(() => []),
  setTasksFromLocalStorageAndRender: jest.fn(),
}));

describe("Task Operation - addTask function", () => {
  beforeEach(() => {
    setTasksFromLocalStorageAndRender.mockClear();
  });

  test("should add a new task to an empty list", () => {
    addTasks("New Task");

    expect(setTasksFromLocalStorageAndRender).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          description: "New Task",
          completed: false,
        }),
      ])
    );
  });

  test("should add a new task to an existing list", () => {
    getTasksFromLocalStorage.mockReturnValueOnce([
      { description: "Task 1", completed: false, id: 1 },
      { description: "Task 2", completed: false, id: 2 },
    ]);

    addTasks("Task 3");

    expect(setTasksFromLocalStorageAndRender).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ description: "Task 3", completed: false }),
      ])
    );

    expect(setTasksFromLocalStorageAndRender).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ description: "Task 1" }),
        expect.objectContaining({ description: "Task 2" }),
        expect.objectContaining({ description: "Task 3" }),
      ])
    );
  });

  test("should not add a task with a short description", () => {
    addTasks("Hi");

    expect(setTasksFromLocalStorageAndRender).not.toHaveBeenCalled();
  });

  test("should assign a unique ID to each task", () => {
    addTasks("Unique Task 1");
    const firstCallArgs = setTasksFromLocalStorageAndRender.mock.calls[0][0];

    addTasks("Unique Task 2");
    const secondCallArgs = setTasksFromLocalStorageAndRender.mock.calls[1][0];

    const firstTaskId = firstCallArgs[0].id;
    const secondTaskId = secondCallArgs[0].id;

    expect(firstTaskId).not.toBe(secondTaskId);
  });

  test("should not add a task with an empty description", () => {
    addTasks("");

    expect(setTasksFromLocalStorageAndRender).not.toHaveBeenCalled();
  });
});

describe("Task Operation - deleteTask function", () => {
  beforeEach(() => {
    setTasksFromLocalStorageAndRender.mockClear();
    getTasksFromLocalStorage.mockClear();
  });

  test("should remove a task from the list", () => {
    getTasksFromLocalStorage.mockReturnValueOnce([
      { description: "Task 1", completed: false, id: 1 },
      { description: "Task 2", completed: false, id: 2 },
    ]);

    deleteTask(1);

    expect(setTasksFromLocalStorageAndRender).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          description: "Task 2",
          completed: false,
          id: 2,
        }),
      ])
    );
    expect(setTasksFromLocalStorageAndRender).not.toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          description: "Task 1",
          completed: false,
          id: 1,
        }),
      ])
    );
  });

  test("should not modify the list if the task does not exist", () => {
    getTasksFromLocalStorage.mockReturnValueOnce([
      { description: "Task 1", completed: false, id: 1 },
      { description: "Task 2", completed: false, id: 2 },
    ]);
    deleteTask(999);

    expect(setTasksFromLocalStorageAndRender).not.toHaveBeenCalled();
  });

  test("should remove the only task in the list", () => {
    getTasksFromLocalStorage.mockReturnValueOnce([
      { description: "Task 1", completed: false, id: 1 },
    ]);

    deleteTask(1);

    expect(setTasksFromLocalStorageAndRender).toHaveBeenCalledWith([]);
  });

  test("should remove a task from a list with multiple tasks", () => {
    getTasksFromLocalStorage.mockReturnValueOnce([
      { description: "Task 1", completed: false, id: 1 },
      { description: "Task 2", completed: false, id: 2 },
      { description: "Task 3", completed: false, id: 3 },
    ]);
    deleteTask(2);

    expect(setTasksFromLocalStorageAndRender).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining(
          {
            description: "Task 1",
            completed: false,
            id: 1,
          },
          {
            description: "Task 3",
            completed: false,
            id: 3,
          }
        ),
      ])
    );

    expect(setTasksFromLocalStorageAndRender).not.toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          description: "Task 2",
          completed: false,
          id: 2,
        }),
      ])
    );
  });
});

describe("Task Operation - sortTasks function", () => {
  test("should sort tasks with completed tasks last when 'tasks-pending' is selected", () => {
    const tasks = [
      { description: "Task 1", completed: true },
      { description: "Task 2", completed: false },
      { description: "Task 3", completed: true },
    ];

    const sortedTasks = sortTasks(tasks, "tasks-panding");

    expect(sortedTasks).toEqual([
      { description: "Task 2", completed: false },
      { description: "Task 1", completed: true },
      { description: "Task 3", completed: true },
    ]);
  });

  test("should sort tasks with completed tasks first when 'tasks-completed' is selected", () => {
    const tasks = [
      { description: "Task 1", completed: false },
      { description: "Task 2", completed: true },
      { description: "Task 3", completed: false },
    ];

    const sortedTasks = sortTasks(tasks, "tasks-completed");

    expect(sortedTasks).toEqual([
      { description: "Task 2", completed: true },
      { description: "Task 1", completed: false },
      { description: "Task 3", completed: false },
    ]);
  });
  test("should return the same list when 'default' is selected", () => {
    const tasks = [
      { description: "Task 1", completed: false },
      { description: "Task 2", completed: true },
      { description: "Task 3", completed: false },
    ];

    const sortedTasks = sortTasks(tasks, "default");

    expect(sortedTasks).toEqual(tasks);
  });
  test("should handle an empty list", () => {
    const tasks = [];

    const sortedTasks = sortTasks(tasks, "tasks-panding");

    expect(sortedTasks).toEqual([]);
  });
  test("should not change the order of tasks with the same completion status", () => {
    const tasks = [
      { description: "Task 1", completed: false },
      { description: "Task 2", completed: false },
      { description: "Task 3", completed: true },
      { description: "Task 4", completed: true },
    ];

    const sortedTasksPending = sortTasks(tasks, "tasks-panding");
    const sortedTasksCompleted = sortTasks(tasks, "tasks-completed");

    expect(sortedTasksPending).toEqual([
      { description: "Task 1", completed: false },
      { description: "Task 2", completed: false },
      { description: "Task 3", completed: true },
      { description: "Task 4", completed: true },
    ]);

    expect(sortedTasksCompleted).toEqual([
      { description: "Task 3", completed: true },
      { description: "Task 4", completed: true },
      { description: "Task 1", completed: false },
      { description: "Task 2", completed: false },
    ]);
  });
});

describe("Task Operation - filterTasks function", () => {
  test("should filter only completed tasks", () => {
    const tasks = [
      { description: "Task 1", completed: true },
      { description: "Task 2", completed: false },
      { description: "Task 3", completed: true },
    ];

    const filteredTasks = filterTasks(tasks, "completed");

    expect(filteredTasks).toEqual([
      { description: "Task 1", completed: true },
      { description: "Task 3", completed: true },
    ]);
  });

  test("should filter only pending tasks", () => {
    const tasks = [
      { description: "Task 1", completed: true },
      { description: "Task 2", completed: false },
      { description: "Task 3", completed: true },
    ];

    const filteredTasks = filterTasks(tasks, "panding");

    expect(filteredTasks).toEqual([
      { description: "Task 2", completed: false },
    ]);
  });

  test("should filter only pending tasks", () => {
    const tasks = [
      { description: "Task 1", completed: true },
      { description: "Task 2", completed: false },
      { description: "Task 3", completed: true },
    ];

    const filteredTasks = filterTasks(tasks, "panding");

    expect(filteredTasks).toEqual([
      { description: "Task 2", completed: false },
    ]);
  });

  test("should return an empty array when filtering an empty list", () => {
    const tasks = [];

    const filteredTasks = filterTasks(tasks, "completed");

    expect(filteredTasks).toEqual([]);
  });
  test("should return all tasks when filter is 'all'", () => {
    const tasks = [
      { description: "Task 1", completed: true },
      { description: "Task 2", completed: false },
    ];

    const filteredTasks = filterTasks(tasks, "all");

    expect(filteredTasks).toEqual(tasks);
  });
});

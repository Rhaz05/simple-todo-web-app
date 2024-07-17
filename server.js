import express from "express";
import "dotenv/config";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";
import { logger } from "./util/logger.util.js";
import { todoList } from "./components/todoList.js";

const app = express();
const port = process.env.PORT || 3000;

const taskList = [
  { id: uuidv4(), name: "Exercise", done: true },
  { id: uuidv4(), name: "Eat Breakfast", done: false },
];

const initServer = () => {
  logger.info("Starting Server...");
  logger.info("Adding Middlewares...");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(express.static("views"));
  app.set("view engine", "ejs");
  app.use(morgan("dev"));

  logger.info("Adding Routes...");
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/task", (req, res) => {
    const list = todoList(taskList);
    res.status(200).send(list);
  });

  app.post("/task", (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).send("Task is required");
    const newTask = [{ id: uuidv4(), name: task, done: false }];
    taskList.push(...newTask);
    const list = todoList(newTask);
    res.status(200).send(list);
  });

  app.delete("/task/:id", (req, res) => {
    const { id } = req.params;
    const newTask = taskList.findIndex((task) => task.id === id);
    taskList.splice(newTask, 1);
    res.status(200).send();
  });

  app.put("/task/:id", (req, res) => {
    const { id } = req.params;
    const taskIndex = taskList.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      taskList[taskIndex].done = !taskList[taskIndex].done;
      res.status(200).send(taskList[taskIndex]);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  });

  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  });
};

initServer();

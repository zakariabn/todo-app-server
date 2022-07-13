const express = require("express");
const Todo = require("../Models/todoModel");
const todoRoute = new express.Router();

// getting todo
todoRoute.get("/", async (req, res) => {
  try {
    const query = req.query;
    const data = await Todo.find(query);
    if (data) {
      res.status(200).json({
        result: data,
        message: "Success",
      });
    } else {
      res.status(500).json({
        error: "There was a server side error!",
        message: "Nothing found in database",
      });
    }
  } catch (error) {
    res.status(500).json({
      err: error,
      message: "There was a server side error!",
    });
  }
});

// adding todo.
todoRoute.post("/", async (req, res) => {
  const todo = req.body;

  if (todo) {
    const newTodo = new Todo(todo);

    newTodo.save((err) => {
      if (err) {
        res.status(500).json({
          // e: err,
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Todo was inserted successfully",
        });
      }
    });
  } else {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// updating a todo by id
todoRoute.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cursor = { _id: id };
    const updated = {
      $set: {
        status: "active",
      },
    };
    await Todo.updateOne(cursor, updated );
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({
      err: error,
      message: "There was a server side error!",
    });
  }
});

module.exports = todoRoute;

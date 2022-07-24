const express = require("express");
const Todo = require("../Models/todoModel");
const todoRoute = new express.Router();
const {formatISO9075 }= require("date-fns");

// getting todays todo
todoRoute.get("/", async (req, res) => {
  try {
    const fitter = req.query;
    const today = formatISO9075(new Date(), { representation: "date" });

    const data = await Todo.find({ ...fitter, date: today }).sort({ fullDate: -1 });
    // const data = await Todo.find({date: {"$gte": today, "$lt": today}}).sort({date: -1});
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

// getting all todo with type query {status: active}
todoRoute.get("/all", async (req, res) => {
  try {
    const fitter = req.query;
    const data = await Todo.find(fitter).sort({ entryTime: -1 });
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
          success: true,
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
    const status = req.query.status;
    const filter = { _id: id };
    const update = {
      $set: {
        status: status,
      },
    };
    await Todo.updateOne(filter, update);
    res.status(200).json({ success: true, message: "updated successfully" });
  } catch (error) {
    res.status(500).json({
      err: error,
      message: "There was a server side error!",
    });
  }
});

// deleting a dodo by id
todoRoute.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "delete successful" });
  } catch (error) {
    res.status(500).json({
      err: error,
      message: "There was a server side error!",
    });
  }
});

module.exports = todoRoute;

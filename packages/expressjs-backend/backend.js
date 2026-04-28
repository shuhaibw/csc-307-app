import express from "express";
import {  addUser,
          getUsers,
          findUserById,
          findUserByName,
          findUserByJob,} from './services/user-service'

const app = express();
const port = 8000;

app.use(express.json());

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name && job) {
    // no 404 error not asking for specific resource
    getUsers(name, job)
      .then((listUsers) => {
        return res.status(200).send(listUsers);
      })
      .catch((err) => {
        return res.status(500).send("Error : " + err);
      }) 
  } 
  else if (name) { 
    findUserByName(name)
      .then((userByName) => {
        return res.status(200).send(userByName);
      })
      .catch((err) => {
        return res.status(500).send("Error : " + err);
      })
  }
  else {
    getUsers(name, job)
      .then((listUsers) => {
        return res.status(200).send(listUsers);
      })
      .catch((err) => {
        return res.status(500).send("Error : " + err);
      }) 
  }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    findUserById(id)
      .then((foundById) => {
        if (!foundById) {
          return res.status(404).send();
        }
        return res.status(200).send(foundById);
      })
      .catch((err) => {
        return res.status(500).send("Error : " + err);
      })
})

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd)
      .then((newUser) => {
        return res.status(201).send(newUser);
      })
      .catch((err) => {
        return res.status(500).send("Error : " + err);
      })
})

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const deletedUser = removeUserById(id);
    if (!deletedUser) {
        return res.status(404).send();
    }
    else {
        return res.status(204).send();
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

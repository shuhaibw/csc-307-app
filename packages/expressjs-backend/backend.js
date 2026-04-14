import express from "express";
import cors from "cors";

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    )
}

const findUserByNameJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
        && user["job"] === job
    )
}

const findUserById = (id) => {
    return users["users_list"].find((user) => 
        user['id'] === id
    )
}

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}

const removeUserById = (id) => {
    // findIndex finds returns index not value
    const index = users["users_list"].findIndex((user) => 
        user['id'] === id
    )

    if (index === -1) {
        return null;
    }
    // return array of removed 
    return users["users_list"].splice(index, 1)[0]
}

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name && job) {
    let result1 = findUserByNameJob(name, job);
    result1 = {users_list: result1};
    return res.send(result1);
  } 
  else if (name) { 
    let result2 = findUserByName(name);
    result2 = {users_list: result2};
    return res.send(result2);
  }
  else {
    return res.send(users); 
  }
});

app.get("/users/:id", (req, res) => {
    // same as req.params.id
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
        return res.status(404).send();
    }
    else {
        res.status(200).send(result);
    }
})

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send(userToAdd);
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

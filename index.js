// Import express
const express = require("express");

const server = express();

let users = [
  {
    id: 0,
    name: "jon",
    bio: "text"
  }
];

// middleware
// teaches the server to parse JSON from the body
server.use(express.json());

// endpoints
server.get("/", (req, res) => {
  res.json({ api: "running....." });
});

// Creates a user using the information sent inside the request body
server.post("/api/users", (req, res) => {
	const userInfo = req.body;
  
	users.push(userInfo);
  
	res.status(201).json(users);
  });

// Returns an array users
server.get("/api/users", (req, res) => {
  res.json(users);
});


// Returns the user object with the specified id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((user) => user.id == id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


// Removes the user with the specified id and returns the deleted user
server.delete("/api/users/:id", (req, res) => {
	const id = req.params.id;
  
	const user = users.find((user) => user.id == id);
  
	if (user) {		
		res.status(200).json(user);
		users.splice(id);
	} else {
	  res.status(404).json({ message: "User not found" });
	}
  });

  //Updates the user with the specified id using data from the request body. Returns the modified user
  server.patch("/api/users/:id", (req, res) => {
	const id = req.params.id;
  
	const user = users.find((user) => user.id == id);
  
	if (user) {		
		user[id].name = req.params.name;
		user[id].bio = req.params.bio;
		res.status(200).json(user);
	} else {
	  res.status(404).json({ message: "User not found" });
	}
  });

const port = 5000; // the server is running on http://localhost:5000
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));

const express = require("express");

const server = express();

// middleware
server.use(express.json());

let users = [
	{
	  id: 0,
	  name: "jon",
	  bio: "text"
	}
  ];

// endpoints
server.get("/", (req, res) => {
	res.json({ api: "running....." });
  });
  

// Creates a user
server.post("/api/users", (req, res) => {
	const user = req.body;
	if (user.name === "" || user.bio === "") {
	  res
		.status(400)
		.json({ errorMessage: "Please provide a name and bio for the user" });
	} else {
	  users.push(user);
	  res.status(201).json(user);
	}
	if (!user) {
	  res.status(500).json({
		errorMessage: "There was an error while saving the user to the database ",
	  });
	}
  });

// Returns an array users
server.get("/api/users", (req, res) => {
  users
    ? res.status(200).json(users)
    : res.status(500).json({
        errorMessage: "The user information could not be retrieved",
      });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((e) => e.id == id);

  user
    ? res.json(user)
    : res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
});

// Removes the user with the specified id and returns the deleted user
server.delete("/api/users/:id", (req, res) => {
	const id = req.params.id;
  
	const user = users.find((user) => user.id == id);
  
	if (user) {		
		users = users.filter(item => item.id != id);
		res.status(200).json(user);
	} else {
	  res.status(404).json({ message: "The user with the specified ID does not exist." });
	}
  });


  server.put('/api/users/:id', (req, res) => {

	const id = req.params.id;

	const selectedUser = users.find(item => item.id == id);

	const updatedUsers = users.filter(item => item != selectedUser);
	
	const selectedUserWithUpdates = {
	   ...selectedUser, name: req.body.name 
	   	? req.body.name : selectedUser.name,
	   bio: req.body.bio 
	   	? req.body.bio : selectedUser.bio
	};
 
	if (!selectedUser) {
	   res.status(404).json({
		  message: `User not found.`
	   });
	} else if (!req.body.name || !req.body.bio) {
	   res.status(400).json({message: 'Please provide name and bio for the user.'});
	} else {
	   updatedUsers.push(selectedUserWithUpdates);
	};
 
	if (!updatedUsers.find(item => item === selectedUserWithUpdates)) {
	   res.status(500).json({message: 'The user information could not be modified.'})
	} else {
	   users = updatedUsers;
	   res.status(200).json(selectedUserWithUpdates);
	};
 
 });

const port = 5000; // the server is running on http://localhost:5000
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));
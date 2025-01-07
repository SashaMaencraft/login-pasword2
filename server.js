// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('my_database.db', (err) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });


app.post('/register', (req, res) => {
    const { name, email, password, salt } = req.body;
    db.run('INSERT INTO users (name, email, password, salt) VALUES (?, ?, ?, ?)', [name, email, password, salt], function(err) {
        if (err) {
            console.error('Error registering user:', err.message);
           return res.status(500).json({ message: "Error registering user" });
        }
        res.json({message: 'User registered'});
    })
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if(err) {
      console.error('Error getting user:', err.message);
      return res.status(500).json({message: 'Error getting user'});
    }
      if(!user || user.password !== password) {
         return res.status(401).json({message: 'Invalid credentials'})
      }

    res.json({ message: 'User logged in', user});
  })
})

app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if(err){
        console.error('Error getting users', err.message);
        res.status(500).json({message: 'Error getting users'});
        return;
      }
     res.json(rows);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
.about-menu-container {
  position: relative;
}

.about-menu {
position: absolute;
  top: 100%;
 left: 0;
background-color: #333;
border-radius: 5px;
padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
   display: none;
 z-index: 1;

}

.about-menu a {
display: block;
  color: white;
   text-decoration: none;
margin-bottom: 5px;
transition: background-color 0.3s ease;
   padding: 8px;
    border-radius: 5px;
}

.about-menu a:hover {
background-color: #555;
}
.about-menu-container {
  position: relative;
}

.about-menu {
position: absolute;
  top: 100%;
 left: 0;
background-color: #333;
border-radius: 5px;
padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
   display: none;
 z-index: 1;

}

.about-menu a {
display: block;
  color: white;
   text-decoration: none;
margin-bottom: 5px;
transition: background-color 0.3s ease;
   padding: 8px;
    border-radius: 5px;
}

.about-menu a:hover {
background-color: #555;
}
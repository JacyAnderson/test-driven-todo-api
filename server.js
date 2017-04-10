// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  console.log("Hello world!");
  res.json({todos: todos});

  /* This endpoint responds with all of the todos
   */
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  console.log('HOLA SENOR!');
  var newTodo = req.body;

      if (todos.length > 0) {
        // assign newTodo an id at end of array
        newTodo._id = todos[todos.length - 1]._id + 1;
      } else {
        // otherwise (if array is empty) set id to one
        newTodo._id = 1;
      }

      //push new todo to array
      todos.push(newTodo);

      res.json(newTodo);
    });

app.get('/api/todos/:id', function show(req, res) {
  var todoId = parseInt(req.params.id);
  
  var newTodo = todos.filter(function (todo) {
        return todo._id == todoId;
      })[0];

  res.json(newTodo);
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
});

app.put('/api/todos/:id', function update(req, res) {
  // Get id out of params
  var id = req.params.id;
  todos.forEach(function(el, index) {
    if(el._id == id) {
      console.log(el._id);
      todos[index]._id = req.body._id;
      todos[index].task = req.body.task;
      todos[index].description = req.body.description;
      res.json(req.body);
    }
  });
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var id = req.params.id -1;
  res.json(todos.splice([id], 1));
  res.end();
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});


var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://test:test@ds117136.mlab.com:17136/todo', {useMongoClient: true});

// Create a schema- just like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

// Create a variable for model: this same variable will be used for adding and removing records.
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

    // GET request
    app.get('/todo', function(req, res){

        // get data from MongoDb and pass it to view. find({})--> Blank parameter means, we want all data from DB.
        // To search specific item just type {item : 'Required string here.'}
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    // POST request
    app.post('/todo', urlencodedParser, function(req, res){

        // get data from the view and add it to DB.
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data); // sending the updated data back to front end
        });
    });

    // DELETE request
    app.delete('/todo/:item', function(req, res){

        // Filtering data, if return TRUE, item remains in 'data' array
        // and if return FALSE, item is deleted from 'data' array and updated array is passed to jquery

        //delete the requested item from db
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
}

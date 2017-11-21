
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://test :test@ds117136.mlab.com:17136/todo');

// Create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

// var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item:'buy flower'}).save(function(err){
//     if(err)
//     console.log('Item saved');
// });

var data = [ {item: 'get milk'}, {item: 'commit code'}];

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

app.get('/todo', function(req, res){
    res.render('todo', {todos: data});

});

app.post('/todo', urlencodedParser, function(req, res){
    console.log('inside POST');

    data.push(req.body);  // adding in data array.
    res.json(data); // sending the updated data back to front end
});

app.delete('/todo/:item', function(req, res){
    console.log('inside DELETE');

    // Filtering data, if return TRUE, item remains in 'data' array
    // and if return FALSE, item is deleted from 'data' array and updated array is passed to jquery
    data = data.filter(function(todo){
        return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
});
}

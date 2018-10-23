var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/public/dist/public' ));
app.set("views", path.join(__dirname, "./views"));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/RestfulTasksAPI");

var TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, 
{
    timestamps: true
});

mongoose.model("Task", TaskSchema);
var Task = mongoose.model("Task");
mongoose.Promise = global.Promise;

app.get('/task', function(request,response){
    Task.find({}, function(err, data){
        if(err){
            console.log(err);
            response.json({
                message: "THERE IS AN ERROR at INDEX ROUTE!",
                error: error
            });
        } else {
            console.log(data);
            response.json(data)
        }
    });
});

app.get('/:id', function(request, response){
    console.log(request.params.id);
    Task.findOne({
        _id: request.params.id
    },
    function(error, data){
        if(error){
            console.log(error);
            response.json({
                message: "Error getting ID",
                error: error
            });
        } else {
            console.log(data);
            response.json(data)
        };
    });
});

app.post('/task', function(request, response){
    console.log("AT POST DATA OF TASKS : " + request.body);
    var task = new Task({
        title: request.body.title,
        description: request.body.description,
        completed: request.body.completed
    });
    task.save(function (error, data){
        if(error){
            console.log(error);
            response.json({
                message: "Error",
                error: error
            });
        } else {
            console.log(data);
            response.json(data)
        };
    });
});

app.put('/task/:id', function(request, response){
    console.log(request.body);
        var obj = {};
        if (request.body.title) {
            obj['title'] = request.body.title;
        }
        if (request.body.description) {
            obj['description'] = request.body.description;
        }
        if (request.body.completed != null) {
            obj['completed'] = request.body.completed;
        }
        obj['updated_at'] = Date.now();
        Task.update({ _id: request.params.id }, {
            $set: obj
        }, function (err, task) {
            if (err) {
                response.json({ message: "Error", error: err })
            } else {
                response.json({ message: "Success", data: task })
            }
        });
    })

    // Task.update({_id: request.params._id}, function(error, data)
    //     {
    //     data.title = request.body.title;
    //     data.description = request.body.description;
    //     data.completed = request.body.completed;
    //     data.update(function(error){
    //         if(error){
    //             // console.log(error);
    //             response.json({
    //                 message: "Error in PUT tasks/ID route",
    //                 error: error
    //         });
    //     } else {
    //         console.log(data);
    //         response.json(data)
    //     }
    //     })

app.delete('/task/:id', function(request, response){
    console.log(request.params.id);
    Task.remove({
        _id: request.params.id
    }, function(error){
        if(error){
            console.log(error);
            response.json({
                message: "Error at REMOVE by ID Route",
                error: error
            });
        } else {
            console.log("REMOVED task by ID.");
            response.json({
                message: "REMOVED task by ID.",
            });
        };
    });
});

app.listen(8000, function(){
    console.log("LISTENING on Port 8000!");
});

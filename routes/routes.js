var faker = require("faker");
var userController = require("../controllers/users");
var taskController = require("../controllers/tasks")

var appRouter = function (app){
    app.get("/", function (req , res) {
        res.status(200).send("Bienvenido a nuestra Restful API");
    });
    app.get("/users", function(req, res, next){
        userController.getUsers(req, res, next);
    });
    app.get("/tasks", function(req, res, next){
        taskController.getTasks(req, res, next);
    });
    
}
 
module.exports=appRouter;
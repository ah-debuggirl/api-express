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
    app.post("/users", (req, res, next) => {
        userController.createUser(req, res, next);
    });
    app.get("/users/:id", (req, res, next) => {
        userController.getUser(req, res, next);
    });
    app.put("/users/:id", (req, res, next) => {
        userController.updateUser(req, res, next);
    });
    app.delete("/users/:id", (req, res, next) => {
        userController.deleteUser(req, res, next);
    });


    app.get("/tasks", function(req, res, next){
        taskController.getTasks(req, res, next);
    });

    app.post("/tasks", (req, res, next) => {
        taskController.createTask(req, res, next);
    });

    app.get("/tasks/:id", (req, res, next) => {
        userController.getUser(req, res, next);
    });
    app.put("/tasks/:id", (req, res, next) => {
        userController.updateUser(req, res, next);
    });
    app.delete("/tasks/:id", (req, res, next) => {
        userController.deleteUser(req, res, next);
    });
    
}
 
module.exports=appRouter;
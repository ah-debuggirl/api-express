process.env.NODE_ENV = "test";

let task = require("../models/task");

//Require dev dependecies

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

//Our parent block

describe("tasks", () => {
    beforeEach((done) => {
        task.remove({}, (err) => {
            done();
        });
    });

    //Test de GET route

    describe("/GET tasks", () => {
        it("it should GET all tasks", (done) => {
            chai.request("http://localhost:3000")
            .get("/tasks")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.length.should.be.eql(0);
            done();
            });
        });
    });

    describe("/POST a new task", () => {
        it("it should POST a task", (done) => {
            let newTask = new task({
                title: "tarea",
                description: "Realizar tarea"
            });
            
            chai.request("http://localhost:3000")
            .post("/tasks")
            .send(newTask)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("object");
            done();
            });
        });
    });

    describe("/GET/:id task", () => {
        it("it should GET a task by the given id", (done) => {
            let newTask = new task({
                title: "Tarea",
                description: "Realizar nueva tarea"
            });
            newTask.save((err, newTask) => {
                chai.request("http://localhost:3000")
                .get("/tasks/" + newTask._id)
                .send(newTask)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                done();
                });
            });
        });
    });

    describe("/PUT/:id task", () => {
        it("it should UPDATE a task given the id", (done) => {
            let newTask = new task({
                title: "Tarea",
                description: "Realizar nueva tarea"
            });
            newTask.save((err, newTask) => {
                chai.request("http://localhost:3000")
                .put("/tasks/" + newTask._id)
                .send({
                    title: "Nueva tarea",
                description: "Realizar otra tarea"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                done();
                });
            });
        });
    });

    describe("/DELETE/:id task", () => {
        it("it should DELETE a task given the id", (done) => {
            let newTask = new task({
                title: "Tarea",
                description: "Realizar nueva tarea"
            });
            newTask.save((err, newTask) => {
                chai.request("http://localhost:3000")
                .delete("/tasks/" + newTask._id)
                .end((err, res) => {
                    res.should.have.status(204);
                done();
                });
            });
        });
    });

});
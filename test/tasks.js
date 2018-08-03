process.env.NODE_ENV = 'test';

let task = require('../models/task');

//Require dev dependecies

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

//Our parent block

describe('tasks', () => {
    beforeEach((done) => {
        task.remove({}, (err) => {
            done();
        });
    });

    //Test de GET route

    describe('/GET tasks', () => {
        it('it should GET all tasks', (done) => {
            chai.request('http://localhost:3000')
            .get('/tasks')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
            });
        });
    });

    describe('/GET/:id task', () => {
        it('it should GET a task by the given id', (done) => {
            let newTask = new task({
                title: 'Tarea',
                description: 'Realizar nueva tarea'
            });
            newTask.save((err, res) => {
                chai.request('http://localhost:3000')
                .get('/tasks/' + newTask._id)
                .send(newTask)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
                });
            });
        });
    });
});
process.env.NODE_ENV = 'test';

let user = require('../models/user');

//Require dev-dependencies

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block

describe('users', () => {
    beforeEach((done) => { //Before each test we empty the database
        user.remove({}, (err) => {
            done();
        });
    });

    //*Test the /GET route

    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request('http://localhost:3000')
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
            });
        });
    });

    describe('/POST user', () => {
        it('it should POST an user', (done) => {
            let newUser = new user({
                userName: 'Arnulfo',
                firstName: 'Montes',
                lastName: 'de Oca'
            });
            
            chai.request('http://localhost:3000')
            .post('/users')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
            done();
            });
        });
    });

    describe('/GET/:id user', () => {
        it('it should GET an user by the given id', (done) => {
            let newUser = new user({
                userName: 'Arnulfo',
                firstName: 'Montes',
                lastName: 'de Oca'
            });
            newUser.save((err, res) => {
                chai.request('http://localhost:3000')
                .get('/users/' + newUser._id)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
                });
            });
        });
    });

    describe('/PUT/:id user', () => {
        it('it should UPDATE an user given the id', (done) => {
            let newUser = new user({
                userName: 'Arnulfo',
                firstName: 'Montes',
                lastName: 'de Oca'
            });
            newUser.save((err, res) => {
                chai.request('http://localhost:3000')
                .put('/users/' + newUser._id)
                .send({
                    userName: 'Pafnuncio',
                    firstName: 'Pérez',
                    lastName: 'al Cuadrado'
                })
                .end((err, res) => {
                    res.should.have.status(500)
                    res.body.should.be.a('object');
                done();
                });
            });
        });
    });


    describe('/UPDATE/:id user', () => {
        it('it should UPDATE an user given the id', (done) => {
            let updatedUser = new user({
                userName: 'Arnulfo',
                firstName: 'Montes',
                lastName: 'del Campo'
            });
            updatedUser.save((err, res) => {
                chai.request('http://localhost:3000')
                .put('/users/' + updatedUser._id)
                .send({
                    userName: 'Pafnuncio',
                    firstName: 'Pérez',
                    lastName: 'al Cuadrado'
                })
                .end((err, res) => {
                    res.should.have.status(500)
                    res.body.should.be.a('object');
                done();
                });
            });
        });
    });

    describe('/DELETE/:id user', () => {
        it('it should DELETE an user given the id', (done) => {
            let newUser = new user({
                userName: 'Arnulfo',
                firstName: 'Montes',
                lastName: 'de Oca'
            });
            newUser.save((err, newUser) => {
                chai.request('http://localhost:3000')
                .delete('/users/' + newUser._id)
                .end((err, res) => {
                    res.should.have.status(204);
                done();
                });
            });
        });
    });
        

});
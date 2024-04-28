let chai;
let chaiHttp;
let server;
try {
    import('chai').then(chaiModule => {
        chai = chaiModule.default;
        import('chai-http').then(chaiHttpModule => {
            chaiHttp = chaiHttpModule.default;
            import('../server').then(serverModule => {
                server = serverModule.default;
                runTests();
            });
        });
    });
} catch (err) {
    console.error(err);
}

function runTests() {
    chai.use(chaiHttp);

    const should = chai.should();

    before(function(done) {
        this.timeout(20000); 
        const client = require('../dbConnection');
        client.connect(err => {
            if (err) done(err);
            else done();
        });
    });

    describe('/GET cats', () => {
        it('it should GET all the cats', (done) => {
            chai.request(server)
                .get('/api/cats')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST cat', () => {
        it('it should POST a new cat', (done) => {
            let cat = {
                title: "Test Cat",
                subTitle: "Sub Test Cat",
                path: "images/kitten1.jpg",
                description: "This is a test cat"
            };

            chai.request(server)
                .post('/api/cat')
                .send(cat)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('success');
                    done();
                });
        });
    });

    describe('/DELETE/:id cat', () => {
        it('it should DELETE a cat given the id', (done) => {
            let id = "66285a3f672659f37298cce1";

            chai.request(server)
                .delete('/api/cat/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('success');
                    done();
                });
        });
    });
}

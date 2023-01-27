const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/random', (req, res) => {
    res.json(db.find((req) => req.id === Math.floor(Math.random() * db.length) + 1));
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.find((testimonial) => testimonial.id === +req.params.id));
    console.log('with +', req.params.id);
    console.log('', req.params.id);
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    const id = uuid();
    const newTestimonial = { id: id, author, text };
    db.push(newTestimonial);
    res.json({ message: 'ok!' });
});

app.put(
    '/testimonials/:id',
    (req, res) => {
        const { author, text } = req.body;
        const id = +req.params.id;
        const testimonial = db.find((testimonial) => testimonial.id === id);
        testimonial.author = author;
        testimonial.text = text;
        res.json({ message: 'ok!' });    },
    (err) => {
        console.log(err);
    }
);

app.delete(
    '/testimonials/:id',
    (req, res) => {
        const id = +req.params.id;
        db.splice(
            db.findIndex((testimonial) => testimonial.id === id),
            1
        );
        res.json({ message: 'testimonial deleted' });
    },
    (err) => {
        console.log(err);
    }
);

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/nosotros', (req, res) => {
    res.render('nosotros');
});

app.get('/3ra-muestra', (req, res) => {
    res.render('3ra-muestra');
});

app.get('/prensa', (req, res) => {
    res.render('prensa');
});

app.get('/contacto', (req, res) => {
    res.render('contacto');
});

app.post('/contacto', (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: email,
        to: 'destination-email@gmail.com',
        subject: asunto,
        text: `Nombre: ${nombre}\nCorreo electrónico: ${email}\nMensaje: ${mensaje}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error al enviar el correo.');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.send('¡Gracias por escribirnos!');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
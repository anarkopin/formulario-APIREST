const express = require('express');
const app = express();
const mail = require('@sendgrid/mail');
require('dotenv').config()

app.use(express.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST');
    next();
});


app.get('',(req, res) => {
    res.send('Hola mundo')

})

app.post('/api/formulario',(req, res) => {
    const { name, email, ruc, number, message  } = req.body;

    contentHTML = `
        <uL>
            <li>Nombre: ${name}</li>
            <li>Email: ${email}</li>
            <li>Ruc: ${ruc}</li>
            <li>Number: ${number}</li>
            <li>Mensaje: ${message}</li>
        </ul>
    `
    console.log(name)
    console.log(email)
    console.log(ruc)
    console.log(number)
    console.log(message)

    try {
        sengridEmail(contentHTML);   
        res.send("Todo ok")
    } catch(err) {
        res.status(500).send('Ha ocurrido')
    }

    

})


const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Esta activo en el puerto"+port) )



function sengridEmail(contentHTML) {

    const email = process.env.EMAIL_SENGRID;
    const key = process.env.API_KEY_SENGRID;

    mail.setApiKey(key);

    sendMail = async (req, res) => {

        await mail.send({
            to: email,
            from: email,
            subject: 'Nuevo contacto',
            html: contentHTML,
        })
    
    }

    sendMail();

}

























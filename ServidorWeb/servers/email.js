var nodemailer = require('nodemailer');

exports.sendEmail = function(req, res){

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: 'joshuanostas10@gmail.com',
            clientId: '701746460754-1c3q5pllnc9m85gisqph36ogoqvmfesh.apps.googleusercontent.com',
            clientSecret: 'dhA1IY0w784AHLvWq_70t1F_',
            refreshToken: '1//04rDISc1kfbq2CgYIARAAGAQSNwF-L9IrWHPMsiCh_ATKctU3Ed-oY13qoE2QC-RjIFMglHKIG55NGTaX-bQZhSdQhPyYELTck5s'
        }
    });
    
    var mailOptions = {
        from: 'Stay Away App',
        to: 'joshuanostas49@gmail.com',
        subject: req.subject.toString(),
        text: req.text.toString() + " Este email fue enviado por la aplicacion StayAway para mantenerte siempre informado"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
        } else {
            console.log("Email sent");
        }
    });
};
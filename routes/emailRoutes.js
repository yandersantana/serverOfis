const { Router } = require('express');
const router = Router();
const nodemailer = require("nodemailer");
const fs = require('fs');

router.post("/sendmail", (req, res) => {

  let transporter = nodemailer.createTransport({
    //si es gmail
    /*  host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'keilacicaza@gmail.com',
        pass: '***********'
      },
      tls: {
        rejectUnauthorized: false
      }*/
    //si es otro
    name: 'oyecuentos.com',
    host: 'mail.oyecuentos.com',
    port: 465,
    secure: true,
    auth: {
      user: 'keymytest@oyecuentos.com',
      pass: 'keymytest'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  var a =req.body.typeFile
  var reemplace = a.replace("/", ".");
  let mailOptions = {
    from: 'keymytest@oyecuentos.com', // TODO: email sender
    to: req.body.to, // TODO: email receiver
    subject: req.body.subject,
    text: req.body.coment,
    attachments: [
      {   // utf-8 string as an attachment
        filename: req.body.filename + reemplace,
        contentType: req.body.typeFile,
        path: req.body.fileContent
       

      },
    ]
  };

  transporter.sendMail(mailOptions, (err, data) => {

    if (err) {
      console.log('Error occurs');
      res.json({
        'message': 'Error',
      });
    }
    console.log('Email sent!!!');
    res.json({
      'message': 'Sent',
    });
  });

});
module.exports = router;


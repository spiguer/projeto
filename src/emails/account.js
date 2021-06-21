const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, username) => {
    sgMail.send({
        to: email,
        from: 'nunoeccb@gmail.com',
        subject: 'Registo',
        text: `Bem vindo á aplicação, ${username}. O seu registo foi efetuado com sucesso`
    })
}

const sendCancelationEmail = (email, username) => {
    sgMail.send({
        to: email,
        from: 'nunoeccb@gmail.com',
        subject: 'Cancelation Email',
        text: `Confirmação, ${username}.`
    })
}

const sendInscricaoEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nunoeccb@gmail.com',
        subject: 'Inscrição Confirmada',
        text: `O aluno, ${name}, fez a sua inscrição com sucesso.`
    })
}

module.exports = {
    sendWelcomeEmail: sendWelcomeEmail,
    sendCancelationEmail: sendCancelationEmail,
    sendInscricaoEmail: sendInscricaoEmail
}
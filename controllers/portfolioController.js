const eeClient = require('elasticemail-webapiclient').client;

const options = {
    apiKey: process.env.ELASTICEMAIL_APIKEY,
    apiUri: 'https://api.elasticemail.com/',
    apiVersion: 'v2'
}

const EE = new eeClient(options);

EE.Account.Load().then(function (resp) {
    console.log(resp);
});
const sendEmailController = (req, res) => {
    try {
        const { name, email, msg } = req.body;

        //validation
        if (!name || !email || !msg) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }

        //email matter
        const emailParams = {
            to: "aayushbhandari6789@gmail.com",
            from: "aayushbhandari6789@gmail.com",
            subject: "Regarding Mern Portfolio App",
            body: `
              <h5>Detail Information</h5>
              <ul>
                <li><p>Name : ${name}</p></li>
                <li><p>Email : ${email}</p></li>
                <li><p>Message : ${msg}</p></li>
              </ul>
            `,
        }

        EE.Email.Send(emailParams)
            .then(() => {
                return res.status(200).send({
                    success: true,
                    message: "Your message sent successfully"
                });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).send({
                    success: false,
                    message: "Error sending email",
                    error: err
                });
            });
        // return res.status(200).send({
        //     success: true,
        //     message: "Your Message Send Successfully",
        // });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Send Email API error",
            error
        })
    }
}

module.exports = { sendEmailController };
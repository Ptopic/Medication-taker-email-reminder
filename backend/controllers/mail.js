const { v4: uuidv4 } = require('uuid');
const schedule = require('node-schedule');
const { mailTransport, templateHtml } = require('../utils/mail');

exports.sendEmail = async (req, res) => {
	const { email, medication, time } = req.body;

	var today = new Date();
	if (today.getMinutes() < 10) {
		var todayTime = today.getHours() + 2 + ':' + '0' + today.getMinutes();
	} else {
		var todayTime = today.getHours() + 2 + ':' + today.getMinutes();
	}

	var newHour = Number(today.getHours() + 2) + Number(time);

	if (newHour > 24) {
		newHour = 0;
	}

	if (today.getMinutes() < 10) {
		console.log('True');
		var newTime = newHour + ':' + '0' + today.getMinutes();
	} else {
		var newTime = newHour + ':' + today.getMinutes();
	}

	console.log(newTime);
	console.log(newHour);
	const mailOptions = {
		from: 'email@email.com',
		to: email,
		subject: `You drank ${medication} at - ${todayTime}`,
		html: templateHtml(medication, newTime),
	};
	mailTransport().sendMail(mailOptions, function (err, info) {
		if (err) {
			return res.status(400).send({ success: false, error: 'Cant send email' });
		} else {
			return res.status(200).send({ success: true, error: 'Success' });
		}
	});
};

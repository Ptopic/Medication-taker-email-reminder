const { v4: uuidv4 } = require('uuid');
const schedule = require('node-schedule');
const { mailTransport, templateHtml } = require('../utils/mail');

exports.sendEmail = async (req, res) => {
	const { email, medication, time } = req.body;

	var today = new Date();
	today.toLocaleString('de-DE', {
		hour: '2-digit',
		hour12: false,
		timeZone: 'Europe/Zagreb',
	});
	if (today.getMinutes() < 10) {
		var todayTime = today.getHours() + ':' + '0' + today.getMinutes();
	} else {
		var todayTime = today.getHours() + ':' + today.getMinutes();
	}

	var newHour = Number(today.getHours()) + Number(time);

	if (newHour > 24) {
		newHour = newHour - 24;
	}

	if (today.getMinutes() < 10) {
		var newTime = newHour + ':' + '0' + today.getMinutes();
	} else {
		var newTime = newHour + ':' + today.getMinutes();
	}

	newTime.toLocaleString('de-DE', {
		hour: '2-digit',
		hour12: false,
		timeZone: 'Europe/Zagreb',
	});

	console.log(todayTime);
	console.log(newHour);
	console.log(newTime);
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

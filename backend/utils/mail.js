const nodemailer = require('nodemailer');

exports.mailTransport = () =>
	nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.GMAIL_EMAIL,
			pass: process.env.GMAIL_PASSWORD,
		},
	});

exports.templateHtml = (medication, time) => {
	return `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Document</title>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<link
				href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
				rel="stylesheet"
			/>
			<style>
				h1 {
					color: #FF6961;
				}

				.medication-name {
					color: #FF6961;
				}
				.container {
					font-family: 'Poppins', sans-serif;
				}

				.time {
					color: #FF6961;
					font-size: 50px;
				}
				.time-container {
					font-family: 'Poppins', sans-serif;
				}
			</style>
		</head>
		<body>
			<div class="container">
				<h2>Hi there!</h2>
				<h3>You just took - <span class="medication-name">${medication}</span></h3>
				<p>You can take it again at:</p>
				<div class="time-container">
					<span class="time">${time}</span>
				</div>
			</div>
		</body>
	</html>`;
};

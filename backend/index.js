const epxress = require('express');
const app = epxress();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;

require('dotenv').config();

const mailerRoute = require('./routes/mail');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(epxress.json());
app.use(cors());

app.use('/api/mail', mailerRoute);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

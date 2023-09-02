import React, { useState, useEffect } from 'react';
import { BsBoxArrowRight, BsClock } from 'react-icons/bs';
import { FcCheckmark } from 'react-icons/fc';

// Formik, yup
import { Formik } from 'formik';
import * as Yup from 'yup';

// Lottie
import Lottie from 'lottie-react';
import loadingAnimation from './assets/loading.json';

// Api calls
import { sendEmail } from './utils/apiCalls';
function App() {
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);

	const initialValuse = {
		email: 'notificationscollector@gmail.com',
		medication: 'Reglan',
		time: '6',
	};

	const validationSchema = Yup.object({
		email: Yup.string().email().required('Required'),
		medication: Yup.string().required('Required'),
		time: Yup.number().required('Required'),
	});

	const handleSend = async (values, formikActions) => {
		// Set sending to true
		setSending(true);
		// call api
		const data = await sendEmail(values);

		// when process finishes set sending to false then set sent to true
		setSending(false);
		setSent(true);
		// after some time set sent to false
		setTimeout(() => {
			setSent(false);
		}, 2000);
	};
	return (
		<div className="app-container">
			<h1>Medication tracker:</h1>

			<Formik
				initialValues={initialValuse}
				// enableReinitialize={true}
				validationSchema={validationSchema}
				onSubmit={handleSend}
			>
				{(formik) => (
					<form onSubmit={formik.handleSubmit}>
						<div className="input-container">
							<input
								type="text"
								className={
									formik.touched.medicine && formik.errors.medicine
										? 'error'
										: 'input'
								}
								name="email"
								autoComplete="off"
								{...formik.getFieldProps('email')}
							/>
							<label
								className={
									formik.touched.time && formik.errors.time
										? 'error-label'
										: 'floating-label'
								}
							>
								Email
							</label>
						</div>
						<div className="input-container">
							<input
								type="text"
								className={
									formik.touched.medicine && formik.errors.medicine
										? 'error'
										: 'input'
								}
								name="medication"
								autoComplete="off"
								{...formik.getFieldProps('medication')}
							/>
							<label
								className={
									formik.touched.time && formik.errors.time
										? 'error-label'
										: 'floating-label'
								}
							>
								Medication
							</label>
						</div>
						<div className="input-container">
							<input
								type="numeric"
								name="time"
								className={
									formik.touched.time && formik.errors.time ? 'error' : 'input'
								}
								autoComplete="off"
								{...formik.getFieldProps('time')}
							/>
							<label
								className={
									formik.touched.time && formik.errors.time
										? 'error-label'
										: 'floating-label'
								}
							>
								Time until next dose
							</label>
						</div>
						<br></br>
						<button type="submit">
							<p>Send</p>
							{sending === true ? (
								<div className="loading-animation-container">
									<Lottie animationData={loadingAnimation} loop={true} />
								</div>
							) : null}
							{sent ? <FcCheckmark size={26} color="white" /> : null}
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
}

export default App;

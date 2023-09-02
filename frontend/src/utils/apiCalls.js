import client from '../api/client';

const catchError = (error) => {
	if (error?.response?.data) {
		return error.response.data;
	} else {
		return { success: false, error: error.message };
	}
};

export const sendEmail = async (values) => {
	try {
		const { data } = await client.post('/mail/send', {
			// data: { email: email, medication: medication, time: time },
			...values,
		});
		console.log(data);
		return data;
	} catch (error) {
		return catchError(error);
	}
};

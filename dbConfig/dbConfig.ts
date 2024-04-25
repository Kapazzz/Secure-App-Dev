import mongoose from 'mongoose';

export async function connectToMongoDB() {
	try {
		mongoose.connect("mongodb+srv://alexkap:q12w$$$q12w@assessment.umbncrd.mongodb.net/?retryWrites=true&w=majority&appName=Assessment");
		const connection = mongoose.connection;

		connection.on('connected', () => {
			console.log('Great! MongoDb is connected bro!');
		});

		connection.on('error', (err) => {
			console.log('MongoDB connected ERROR. ' + err);
			process.exit();
		});
	} catch (error) {
		console.log('Ups! Something went wrong! ' + error);
	}
}

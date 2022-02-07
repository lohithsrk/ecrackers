const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const strRequired = {
	type: String,
    required: true
};

const paymentSchema = new mongoose.Schema({
    paymentID: strRequired,
    //orderID: strRequired,
    //signature: strRequired,
    description: {
			type: [String],
			required: true
		},
    userID: strRequired
});

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;

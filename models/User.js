const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const strRequired = {
	type: String,
	required: true
};

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: strRequired,
	password: strRequired,
	cart: {
		type: [String],
		default: []
	},
	wishlist: {
		type: [String],
		default: []
	},
	totalAmount: Number,
    payments: {
        type: [String],
        default: []
    }
});

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error('Incorrect Password');
	}
	throw Error('Incorrect Email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;

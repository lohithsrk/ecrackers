const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { products } = require('../models/Product');

const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, 'ecrackers digitran', async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.locals.user = null;
				next();
			} else {
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		if (req.originalUrl === '/') {
			// res.locals.msg = 'Login to Purchase!';
			next();
			return;
		}
		res.redirect('/login-login');
	}
};

const localProducts = (req, res, next) => {
	res.locals.products = products;
	next();
};

const userCartItems = async (req, res, next) => {
	next();
};

module.exports = { checkUser, localProducts, userCartItems };

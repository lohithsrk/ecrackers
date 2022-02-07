const { Router } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Payment = require('../models/Payment')
const { products } = require('../models/Product');
const { checkUser } = require('../middlewares/authMiddleware');

const router = Router();

const handleErrors = (err) => {
	let errors = { email: '', password: '' };

	if (err.message === 'Incorrect Email') {
		errors.email = err.message;
		return errors;
	}
	if (err.message === 'Incorrect Password') {
		errors.password = err.message;
		return errors;
	}
	return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) =>
	jwt.sign({ id }, 'ecrackers digitran', {
		expiresIn: maxAge
	});

const register_post = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json({ user });
	} catch (err) {
		res.status(400).json({ err });
	}
};

const login_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);
		if (user) {
			const token = createToken(user._id);
			res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.status(200).json({ user: user._id });
		} else {
			throw Error('Wrong credentials');
		}
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ err: errors });
	}
};

// wishlistdetails

const wishlistdetails = async (req, res) => {
	const { _id } = req.body;
	try {
		const user = await User.findById(_id);
		const count = user.wishlist.reduce((acc, val) => {
			acc[val] = acc[val] + 1 || 1;
			return acc;
		}, {});
		const keys = Object.keys(count);
		const wishlist = keys.map((e) => {
			const det = products.filter((product) => product.id === e)[0];
			det.count = count[e];
			return det;
		});

		res.status(200).json({ wishlist });
	} catch (e) {
		res.status(400).json({ e });
	}
};

// wishlistupdate

const wishlistUpdate = async (req, res) => {
	const { id, uid } = req.body;
	try {
		const user = await User.findById(uid);
		const wishlist = [...new Set([...user.wishlist, id].filter(Boolean))];
		await User.findOneAndUpdate({ _id: uid }, { wishlist });
		res.status(200).json({wishlist});
	} catch (e) {
		console.log({ e });
		res.status(400).json({ e });
	}
};

const wishlistpage = async (req, res) => {
	const { _id } = req.body;
	const user = await User.findById(_id);
	var arr = [];
	user.wishlist.forEach((w) => {
		products.forEach((product) => {
			if (product.id === w) {
				arr.push(product);
			}
		});
	});
	res.json(arr);
};

const wishlistremove = async (req, res) => {
	const { _id, id } = req.body;
	if (_id) {
		try {
			const user = await User.findById(_id);
			const wishlist = user.wishlist.filter((e) => id !== e);
			await User.findOneAndUpdate({ _id }, { wishlist });
			res.status(200).json({ log: 'success' });
		} catch (e) {
			console.log({ e });
			res.status(400).json({ e });
		}
	} else {
		res.send(null);
	}
};

// cartDetails

const cartDetails = async (req, res) => {
	const { _id } = req.body;
	if (_id) {
		try {
			const user = await User.findById(_id);
			const count = user.cart.reduce((acc, val) => {
				acc[val] = acc[val] + 1 || 1;
				return acc;
			}, {});
			const keys = Object.keys(count);
			const cart = keys.map((e) => {
				const det = products.filter((product) => product.id === e)[0];
				det.count = count[e];
				return det;
			});

			res.status(200).json({ cart });
		} catch (e) {
			res.status(400).json({ e });
		}
	} else {
		return null;
	}
};

// cartUpdate

const cartUpdate = async (req, res) => {
	const { id, uid } = req.body;
	try {
		const user = await User.findById(uid);
		const cart = [...user.cart, id].filter(Boolean);
		await User.findOneAndUpdate({ _id: uid }, { cart });
		res.status(200).json(cart);
	} catch (e) {
		console.log({ e });
		res.status(400).json({ e });
	}
};

const cartItemDelete = async (req, res) => {
	const { id, _id } = req.body;
	if (_id) {
		try {
			const user = await User.findById(_id);
			const cart = user.cart.filter((e) => id !== e);
			await User.findOneAndUpdate({ _id }, { cart });
			res.status(200).json({ log: 'success' });
		} catch (e) {
			console.log({ e });
			res.status(400).json({ e });
		}
	} else {
		res.send(null);
	}
};

//shop items
router.get('/single-product/:id', checkUser, (req, res) => {
	const findProduct = products.filter(
		(product) => product.id === req.params.id
	);
	res.render('single-product', { product: findProduct });
});
const signout = async (req, res) => {
	res.clearCookie('jwt');
	res.redirect('/');
};

const shoppingCart = async (req, res) => {
	const { _id } = req.body;
	const user = await User.findById(_id);
	const crackers = products.filter((product) => {
		return user.cart.indexOf(product.id) !== -1;
	});
	res.json(crackers);
};

const getTotal = async (req, res) => {
    const { _id } = req.body
    try {
        const user = await User.findById(_id)
        const total = user.cart
            .map(e => {
                return products.filter(product => product.id === e)
            })
            .map(e => +e[0].discount.split("₹ ")[1])
            .reduce((acc, val) => acc + val, 0)
        res.status(200).json({ total })
    } catch (e) {
        res.status(400).json({ e })
    }
}

const updateItemCount = async (req, res) => {
    const { uid, prodid, count } = req.body
    try {
        const user = await User.findById(uid)
        const cart = user.cart.filter(e => {
            return e !== prodid
        })
        const cartUpdated = [...cart, ...Array.from({ length: count }).fill(prodid)]
        await User.findOneAndUpdate({ _id: uid }, { cart: cartUpdated })
        res.status(200).json({ cart: cartUpdated })
    } catch (e) {
        res.status(400).json({ e })
    }
}
const clearCart= async (req,res) => {
	const { _id } = req.body
	try{
		await User.findOneAndUpdate({ _id : _id } , { $set : {cart : [] } })
	}catch(e){
		res.status(400).json({ e })
	}
}

const paymentDetail = async (req, res) => {
	const { paymentID, userID, description } = req.body
	console.log(req.body);
    try {
        const payment = await Payment.create({ paymentID, userID, description })
        res.status(200).json({ msg: "success" })
    } catch (e) {
        res.status(400).json({ e })
    }
}

router.post('/register', register_post);
router.post('/login', login_post);
router.post('/cartUpdate', checkUser, cartUpdate);
router.post('/cartDetails' , cartDetails);
router.post('/remove', cartItemDelete);
router.post('/wishlistUpdate', checkUser, wishlistUpdate);
router.post('/wishlistdetails', checkUser, wishlistdetails);
router.post('/wishlistpage', checkUser, wishlistpage);
router.post('/wishlistremove', wishlistremove);
router.post('/signout', signout);
router.post('/shopping-cart', shoppingCart);
router.post('/getTotal', getTotal);
router.post('/itemcount', updateItemCount);
router.post('/clearCart', clearCart);
router.post('/paymentDetail', paymentDetail)

module.exports = router;

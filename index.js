const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const authRoutes = require('./routes/authRoutes');
const razorpay = require('./routes/Razorpay');
const { RAZORPAY_KEY_ID } = require('./routes/ApiKeys');

const {
	checkUser,
	localProducts
	//userCartItems,
} = require('./middlewares/authMiddleware');
const app = express();
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.set('view engine', 'ejs');

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('DATABASE CONNECTED'))
	.catch((err) => console.log(err));

app.get('/', checkUser, localProducts, (_, res) => res.render('index'));
app.get('/about-us', checkUser, (_, res) => res.render('about-us'));
app.get('/faq', checkUser, (_, res) => res.render('faq'));
app.get('/index-3', checkUser, (_, res) => res.render('index-3'));

app.get('/login-login', (_, res) =>
	res.render('login-login', { user: undefined })
);
app.get('/login-register', (_, res) =>
	res.render('login-register', { user: undefined })
);
app.get('/vendor-login', (_, res) => res.render('vendor-login'));
app.get('/vendor-register', (_, res) => res.render('vendor-register'));
app.get('/admin-login', (_, res) => res.render('admin-login'));
app.get('/my-profile', checkUser, (req, res) => {
	res.render('my-profile');
});

app.get('/checkout', checkUser, (_, res) =>
	res.render('checkout', { keyid: RAZORPAY_KEY_ID })
);
app.get('/compare', checkUser, (_, res) => res.render('compare'));
app.get('/wishlist', checkUser, (_, res) => res.render('wishlist'));
app.get('/shop-left-sidebar', checkUser, localProducts, (_, res) =>
	res.render('shop-left-sidebar')
);
app.get('/shop-list', checkUser, (_, res) => res.render('shop-list'));
app.get('/shopping-cart', checkUser, (_, res) => res.render('shopping-cart'));

app.get('/404', checkUser, (_, res) => res.render('404'));
app.get('/single-product-sale', checkUser, (_, res) =>
	res.render('single-product-sale')
);
app.get('/single-product-tab-style-top', checkUser, (_, res) =>
	res.render('single-product-tab-style-top')
);

app.use(authRoutes);
app.use(razorpay);

app.listen(process.env.PORT || 3000, () =>
	console.log(`Server is running on port ${process.env.PORT || 3000}`)
);

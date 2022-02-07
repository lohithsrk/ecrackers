const express = require('express')
const router = express.Router();
const Razorpay = require('razorpay')
const { mailJetPublicApi , mailJetSecretApi , RAZORPAY_KEY_ID,RAZORPAY_SECRET_ID }=require('./ApiKeys');
const {checkUser} = require('../middlewares/authMiddleware');
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET_ID,
})
const mailjet=require('node-mailjet').connect(mailJetPublicApi,mailJetSecretApi)

router.use(express.urlencoded({extended: false}));

//contact route
router.get('/contact', checkUser, (_, res) => res.render('contact'));
router.post('/contact', checkUser, (req, res) => {
	const body=req.body;
	const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
			{
				"From": {
					"Email": "now3422now@gmail.com",
					"Name": "Lokendra S"
				},
				"To": [
					{
						"Email": "slokendra2102@gmail.com",
						"Name": "Lokendra S"
					}
				],
				"Subject": "FeedBack",
				"TextPart": `customerName: ${body.customerName},
customerEmail: ${body.customerEmail},
contactSubject: ${body.contactSubject},
contactMessage: ${body.contactMessage}`

			}
		]
	})
	request
		.then((result) => {
			//console.log(result.body);
			//console.log(body);
			res.redirect('/');
		})
		.catch((err) => {
			console.log(err);
			res.render('contact')
		})
});

const AddressMail=async(req,res)=>{
const { FirstName , LastName , CompanyName, Address , ApartmentLocation, TownOrCity ,state , PIN , Email ,MobileNo,description,amount }=req.body;
	const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
			{
				"From": {
					"Email": "now3422now@gmail.com",
					"Name": "Lokendra S"
				},
				"To": [
					{
						"Email": "slokendra2102@gmail.com",
						"Name": "Lokendra S"
					}
				],
				"Subject": "New Order",
				"TextPart": `FirstName: ${FirstName},
LastName: ${LastName},
CompanyName: ${CompanyName},
Address: ${Address},
ApartmentLocation: ${ApartmentLocation},
TownOrCity: ${TownOrCity},
state: ${state},
PIN: ${PIN},
Email: ${Email},
MobileNo: ${MobileNo},
description: ${description},
amount: ${amount}`
			}
		]
	})
	request
		.then((result) => {
			console.log("success")
		})
		.catch((err) => {
			console.log(err);
		})
}

const payment_id_verify=async (req,res)=>{
	const { payment_id } = req.body;
	try{
	 res.json({payment_id:payment_id})
	}
	catch(e){
		res.json({e})
	}
}

router.post("/order-placed",AddressMail);
router.post("/payment-id-verify",payment_id_verify);

module.exports = router;

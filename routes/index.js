const route = require("express").Router();
const isEmpty = require("is-empty");
const nodemailer = require("nodemailer");
require("dotenv").config();
route.get("/", (req, res) => {
	res.render("contact");
});
route.post("/", (req, res) => {
	let check = false;
	const name = req.body.name;
	const email = req.body.email;
	const message = req.body.message;
	isEmpty(name, email, message) ? (check = true) : (check = false);
	if (check == false) {
		async function main () {
			let transporter = nodemailer.createTransport({
				service: "hotmail",
				port: 587,
				secure: false,
				auth: {
					user: process.env.EMAILA,
					pass: process.env.PASS,
				},
			});

			let info = await transporter.sendMail({
				from: process.env.EMAILA,
				to: process.env.EMAILB,
				subject: "Contact form of Portfolio !!",
				html: `<div><center><h2>${req.body.name}</h2></center><ul><li> email : <span>${req.body
					.email}</span></li><li><p>${req.body.message}</p> </li></ul></div>`,
			});
		}
		main()
			.then(() => {
				res.render("contact", { msg: "Mail sent sucessfully !! wait for our Response !  " });
			})
			.catch((e) => {
				res.render("contact", { msg: "Something went wrong , please try again later !!" });
			});
	}
	else {
		res.render("contact", { msg: "Please fill up all fields !!" });
	}
});

module.exports = route;

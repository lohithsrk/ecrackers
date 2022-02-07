const addToCardLinks = document.querySelectorAll('.add-to-cart-link');
addToCardLinks.forEach((addToCardLink) => {
	addToCardLink.addEventListener('click', async (e) => {
		if (document.querySelector('.msg').getAttribute('data-msg').length > 0) {
			document.querySelector('.frame1').classList.remove("hide")
		document.querySelector('.loginModal').style.display = 'block'
		document.querySelector('.redirectHome').addEventListener('click',()=>{window.location.assign("/login-login")})
			//alert(document.querySelector('.msg').getAttribute('data-msg'));
			return;
		}else{
			document.querySelector('.frame2').classList.remove("hide")
			document.querySelector('.CartModal').style.display = 'block'
			document.querySelector('.addCart').addEventListener('click',()=>{window.location.reload()})
			// window.location.reload();
		}
		e.preventDefault();
		try {
			const res = await fetch('/cartUpdate', {
				method: 'POST',
				body: JSON.stringify({
					id: e.target.id,
					uid: e.target.getAttribute('data-uid')
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await res.json
		} catch (e) {
			console.log({ e });
		}
	});
});

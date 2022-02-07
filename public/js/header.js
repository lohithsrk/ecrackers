var hmMinicartTrigger = document.querySelector('.hm-minicart-trigger');
var mainnn = document.querySelector('.mainnn');
var minicart = document.querySelector('.minicart');
var settinIcon=document.querySelector('.ht-setting-trigger');
var setting=document.querySelector('.setting')

mainnn.addEventListener('click', function () {
	//console.log(hmMinicartTrigger.getAttribute('class').includes('is-active'));
	if (hmMinicartTrigger.getAttribute('class').includes('is-active') || settinIcon.classList.contains('is-active')) {
		hmMinicartTrigger.classList.remove('is-active');
		settinIcon.classList.remove('is-active')
        minicart.style.display = 'none';
				setting.style.display="none"
	}
});
settinIcon.addEventListener('click',()=>{
	if(settinIcon.classList.contains('is-active')){
		hmMinicartTrigger.classList.remove('is-active')
		minicart.style.display = 'none';
	}
})
hmMinicartTrigger.addEventListener('click',()=>{
	if(hmMinicartTrigger.classList.contains('is-active')){
		settinIcon.classList.remove('is-active')
		setting.style.display = 'none';
	}
})

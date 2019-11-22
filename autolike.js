var count=0;
function hasBlacklistKeywords(bio) {
	var blacklist = ['ladyboy','lady boy','not a lady','not lady','not a girl','not girl','trans','shemale','chubby',' lb '];
		for (item of blacklist) {
				if(bio.toLowerCase().indexOf(item) !== -1) {
					console.log('skipping profile, matched blacklist keyword ' + item);
					return true;
				}
		}

		return false;
}

function hasValidProfile() {
		var bioClassName = 'profileCard__bio';
		try {
			var bio = document.getElementsByClassName(bioClassName)[0].textContent;
			console.log(bio);
			return !hasBlacklistKeywords(bio);
		} catch (e) {
			// console.log(e);
			return true; 
		}
		return false;
}
function checkTinder() {
	var base = "https://tinder.com/";
	return window.location.href.startsWith(base + "app/recs") || window.location.href.startsWith(base + "app/matches");
}
function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

function trickTinder() {

	var infoClassName = 'recCard__info';
	var dislike = document.getElementsByClassName("recsGamepad__button")[0];
	var like = document.getElementsByClassName("recsGamepad__button")[2];
	var info = document.getElementsByClassName(infoClassName)[0];
	if(info) {
			info.click();
	}
	pause(600);
	if(hasValidProfile()) {
	count++;
			like.click();
			console.log("count= "+count);
	} else {
			dislike.click();
	}
	if (document.getElementsByClassName('productButton__subscriptionButton').length > 0) {
		var hms = document.getElementsByClassName('Fz($ml)')[0].textContent;
		var a = hms.split(':');
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])

		return seconds * 1000;
	}
}


function getRandomPeriod() {
	return Math.round(Math.random() * (2000 - 500)) + 500;
}

(function loopSasori() {
	var randomPeriod = getRandomPeriod();
	setTimeout(function() {
		randomPeriod = undefined;
		if (checkTinder()) {
			var delay	= trickTinder();
			if (delay) {
				console.log('Too many likes for now, have to wait: ' + delay + ' ms');
				randomPeriod = delay;
			}
		}
		
		if (!randomPeriod) {
			loopSasori();
		}
		else {
			setTimeout(loopSasori, randomPeriod);
		}
	}, randomPeriod);
}());

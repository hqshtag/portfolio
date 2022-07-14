let dev = false;

function loadScript(url) {
	return new Promise(function(resolve, reject) {
		let script = document.createElement('script');
		script.src = url;
		script.async = false;
		script.onload = function() {
			resolve(url);
		};
		script.onerror = function() {
			reject(url);
		};
		document.body.appendChild(script);
	});
}

let scripts = [
				'jquery.min.js',
				'particles.min.js',
                'jquery.color.min.js',
                'm-pagetransition.js',
				'myTyper.js',
                'myparticles.js',
                'script.js'
			];

// save all Promises as array
let promises = [];

let animationDone = localStorage.getItem('typingAnimationDone');
let loadedscripts = [];
let prefix = !dev ? "/portfolio/js/" : "/js/"

scripts.forEach(function(url) {
    if(url !== 'myTyper.js' || animationDone !== "true"){
        promises.push(loadScript(`${prefix}${url}`));
        loadedscripts.push(url);
    }
});

Promise.all(promises)
.then(function() {
	console.log('The following scripts are loaded');
    console.table(loadedscripts)
}).catch(function(script) {
	console.log(script + ' failed to load');
});
// loadFotorama.js

async function loadScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.onload = () => resolve(script);
		script.onerror = (error) => reject(error);
		document.head.appendChild(script);
	});
}

async function loadStylesheet(href) {
	return new Promise((resolve, reject) => {
		const link = document.createElement('link');
		link.href = href;
		link.rel = 'stylesheet';
		link.onload = () => resolve(link);
		link.onerror = (error) => reject(error);
		document.head.appendChild(link);
	});
}

async function loadMyPageScripts() {
	try {
		await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js');
		await loadStylesheet('/src/lib/fotorama.css');
		await loadScript('/src/lib/fotorama.js');
		// All scripts and styles are loaded; you can now execute code that depends on them.
	} catch (error) {
		console.error('Error loading script or stylesheet:', error);
	}
}

export { loadMyPageScripts };

/* global fin */
document.addEventListener('DOMContentLoaded', () => {
    const ofVersion = document.getElementById('no-openfin');
    if (typeof fin !== 'undefined') {
        init();
    } else {
        ofVersion.innerText = 'OpenFin is not available - you are probably running in a browser.';
    }
});

function init () {
    fin.desktop.System.getVersion(version => {
        console.log(version);
    });

	const mainWindow = fin.desktop.Window.getCurrent();

	mainWindow.showAt(500,0);

	let divider;

	function showDivider() {
		divider = new fin.desktop.Window({
			name: 'divider',
			url: 'divider.html',
			defaultWidth: 1,
			defaultHeight: 866,
			autoShow: true,
			frame: false,
			saveWindowState: false,
			smallWindow: true,
			alwaysOnTop: true
		}, () => {
			divider.showAt(750,0);
		});
	}

	showDivider();

	let hiddenWindow;
	function showHiddenWindow() {
		hiddenWindow = new fin.desktop.Window({ 
			name: 'hidden',
			url: 'index.html',
			defaultWidth: 250,
			defaultHeight: 0,
			autoShow: true,
			frame: false,
			saveWindowState: false,
			smallWindow: true,
			alwaysOnTop: true
		}, () => {
			hiddenWindow.showAt(500,866)
		})
	}

	showHiddenWindow();

	const bodyElement = document.getElementById('bod')
	function hideWindow() {
		mainWindow.animate({ 
			position: { left: 250, top: 0, duration: 500, relative: true },
			size: { width: 0, duration: 500 }
		});
		hiddenWindow.animate({ 
			position: { left: 250, top: 0, duration: 500, relative: true },
			size: { width: 0, duration: 500 }
		});
		setTimeout(() => { mainWindow.animate(
			{ size: { width: 250, duration: 500, tween: 'ease-out' },
			  position: { left: -250, top: 0, duration: 500, relative: true } }
		) }, 2000)
		setTimeout(() => { hiddenWindow.animate(
			{ size: { width: 250, duration: 500, tween: 'ease-out' },
			  position: { left: -250, top: 0, duration: 500, relative: true } }
		) }, 2000)
	}

	const hideButton = document.getElementById('hide');
	hideButton.onclick = hideWindow;

	const closeButton = document.getElementById('close');
	console.log(closeButton);
	closeButton.onclick = function(){
		fin.desktop.Application.getCurrent().close()
	}
	const notifyButton = document.getElementById('notify');
	notifyButton.onclick = function() {
		fin.desktop.InterApplicationBus.publish('notification-alert', 'hey');
	}
}

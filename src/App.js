/* global fin */
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
	notify = () => toast("Wow so easy !", { position: toast.POSITION.BOTTOM_RIGHT });

	subscribe = () => {
		// fin.desktop.InterApplicationBus.subscribe('*', 'notification-alert', () => this.notify);
		// fin.desktop.InterApplicationBus.subscribe('*', 'notification-alert', () => toast("Wow so easy !", { position: toast.POSITION.BOTTOM_RIGHT }); );
	}

	render(){
		fin.desktop.InterApplicationBus.subscribe('*', 'notification-alert', () => {
			let thisWindow = fin.desktop.Window.getCurrent();
			thisWindow.resizeBy(0, 64, 'bottom-left');
			this.notify();
			setTimeout(() => thisWindow.resizeBy(0,-64, 'bottom-left'), 8000)
		});

		return (
			<div>
				<ToastContainer autoClose={8000}/>
			</div>
		);
	}
}

export default App;

import React from 'react'
import logo from './logo.svg'
import './App.css'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

function App() {
	//const [name, setName] = useState('Mehul')

	const sendDataToReactNativeApp = async () => {
		window.ReactNativeWebView.postMessage('Data from WebView / Website');
	  };

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('https://www.crossdimension.in/paymentManagement/v1.0/order', { method: 'POST', mode: 'cors', headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Methods': 'GET, OPTIONS, POST'}}).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: 'rzp_test_6i2006Za1fnyi8',
			currency: 'INR',
			amount: data?.applicationFee?.toString(),
			order_id: data.razorpayOrderId,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			image: 'http://localhost:1337/logo.svg',
			handler: function (response) {
				console.log(response, 'response------')
				sendDataToReactNativeApp()
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name: 'test',
				email: 'sdfdsjfh2@ndsfdf.com',
				contact: '+919899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<button
					className="App-link"
					onClick={displayRazorpay}
					rel="noopener noreferrer"
					
				>
					Donate $5
				</button>
			</header>
		</div>
	)
}

export default App

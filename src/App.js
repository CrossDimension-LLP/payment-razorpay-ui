import React, { useState } from 'react'
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

const App = () => {
	const [userDetails, setUserDetails] = useState({})
	let detailsVal = {}
	const handleEvent = (message) => {
		const details = JSON.parse(message.data) || {};
		// alert(JSON.stringify(details));
		alert(message.data)
		alert(`${JSON.stringify(details)} | Data trigere`)
		setUserDetails({...details});
		detailsVal={...details}
		console.log(message.data);
		// alert(message.data);
		// alert(JSON.parse(message.data))
	 }
	 
	 // This will only work for Android need to change
	 // https://stackoverflow.com/a/58118984
	 	document.addEventListener("message", handleEvent);

	const sendDataToReactNativeApp = (data) => {
		alert('trigere here')
		console.log(data, 'data--------')
		window.ReactNativeWebView.postMessage(`${JSON.stringify(data)}`);
	  };

	//   useImperativeHandle(ref, () => ({
	// 	handleEvent: (message) => {
	// 		alert('enter in ref')
	// 		const details = JSON.parse(message.data) || {};
	// 		alert(JSON.stringify(details));
	// 		setUserDetails({});
	// 		console.log(message.data);
	// 		alert(message.data);
	// 		alert(JSON.parse(message.data))
	// 	}
	//   }))

	//   window.location.reload(true);

	  

	async function displayRazorpay(details) {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('https://paymentrazorpaybe.azurewebsites.net/paymentManagement/v1.0/order', { method: 'POST'}).then((t) =>
			t.json()
		)

		console.log(data)
		alert(`${JSON.stringify(details)} | data user state`)
		alert(`${JSON.stringify(detailsVal)} | data user details`)
		alert
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
				sendDataToReactNativeApp({paymentId: response.razorpay_payment_id})
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			modal: {
				ondismiss: function(){
				sendDataToReactNativeApp({closeIconTrigger: true})
					alert('close icon access')
					//  window.location.replace("//put your redirect URL");
				 }
			},
			prefill: {
				name: details?.name || detailsVal?.name || 'Makul',
				email: details?.email || detailsVal?.email || 'test@email.com',
				contact: details?.mobileNumber || detailsVal?.mobileNumber || '+911234567890'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()

	}

	return (
		<div className="App">
		{sendDataToReactNativeApp({fetchDetails: true})}
			{displayRazorpay(userDetails)}
			
		</div>
	)
}

export default App

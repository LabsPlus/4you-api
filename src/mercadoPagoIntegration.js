
import { MercadoPagoConfig, Payment } from 'mercadopago';


const client = new MercadoPagoConfig({ accessToken: 'TEST-4665420924123799-111417-f094538234e0f0e001407391e3cc8b3b-1919327405', options: { timeout: 5000, idempotencyKey: 'abc' } });

// Step 3: Initialize the API object
const payment = new Payment(client);

// Step 4: Create the request object 
const body = {
	"items": [
		{
			"id": '1',
			"title": 'Plano Basico',
			"quantity": 1,
			"unit_price": 5.02,
		},
		{
			"id": "2",
			"title": "Plano Premium",
			"quantity": 1,
			"unit_price": 8.49,
		}
	],
	"back_urls": {
		"success": "https://test.com/success",
		"pending": "https://test.com/pending",
		"failure": "https://test.com/failure"
	}
};

// Step 5: Create request options object - Optional
const requestOptions = {
	idempotencyKey: '<IDEMPOTENCY_KEY>',
};

// Step 6: Make the request
payment.create({ body, requestOptions }).then(console.log).catch(console.log);
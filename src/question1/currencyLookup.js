
const fixerUrl = 'http://data.fixer.io/api/latest?access_key=b60d7e6984b3184f2814a9cde4cc7abc';

function fetchCurrency(src,dst) {
	let url = fixerUrl + '&base=EUR&symbols=EUR,' + src + ',' + dst;
	console.log(url);
	return fetch(url)
	.then((response) =>{
		return response.text();
	})
	.then(function(text) {
		let results = JSON.parse(text);
		// {"success":true,"timestamp":1534910351,
		//   "base":"EUR","date":"2018-08-22",
		//   "rates":{"EUR":1,"CAD":1.508533,"USD":1.157441}
		// }
		return {src: results.rates[src], dst : results.rates[dst]};
	});
}

export default  fetchCurrency;
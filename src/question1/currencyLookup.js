
const fixerUrl = 'http://data.fixer.io/api/latest?access_key=b60d7e6984b3184f2814a9cde4cc7abc';
/*
Make the REST call to get the currency exchange rates.  I'm using the free version so it has
limited support for setting the base currency.  The workaround is to get both src and dest rates
relative to the default EUR.  Then to make the conversion I change the input to EURs and then to the
destination currency.
 */
function fetchCurrency(src,dst) {
	let url = fixerUrl + '&base=EUR&symbols=EUR,' + src + ',' + dst;
	console.log(url);
	return fetch(url)
	.then((response) =>{
		return response.text();
	})
	.then(function(text) {
		let results = JSON.parse(text);
		// sample
		// {"success":true,"timestamp":1534910351,
		//   "base":"EUR","date":"2018-08-22",
		//   "rates":{"EUR":1,"CAD":1.508533,"USD":1.157441}
		// }
		return {src: results.rates[src], dst : results.rates[dst]};
	});
	// TODO add error handling
}

export default  fetchCurrency;
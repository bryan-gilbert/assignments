import fetchCountryCodes from './codeData';

/*
Functions to get the country codes (local source) and country information via AJAX. The functions blend
the two lists using the first country code list as the guide.  The blended results contain the 2-character
country code identifier, the country name, the primary currency of the country.

TODO: consider getting the flag url and using it in a scaled image beside the selected country.
 */

// get the local copy of country code data
function resolveCountryCodes() {
	return fetchCountryCodes()
	.then((countryCodesJs) => {
		var countryCodes = Object.keys(countryCodesJs).map(function (key) {
			return {'ccode': key, 'name': countryCodesJs[key]};
		});
		countryCodes.sort((a, b) => {
			return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
		});
		//console.log('countryCodes',countryCodes.length);
		return countryCodes;
	});
}

// get the country data and merge with the country code list
function resolveCountryData(cCodes) {
	return fetch('https://restcountries.eu/rest/v2/all')
	.then((response) =>{
		return response.text();
	})
	// TODO add error handling
	.then(function(text) {
		var countriesData = JSON.parse(text);
		//console.log('countriesData',countriesData.length);
		var countries = {};
		var countriesWithCurrency = [];
		countriesData.forEach((countryData) => {
			countries[ countryData['alpha2Code']] = {
				'name': countryData['name'],
				'ccode': countryData['alpha2Code'],
				'currencies' : countryData['currencies']
			};
		});
		cCodes.forEach((aCode) => {
			var country = countries[aCode.ccode];
			if(country && country.currencies) {
				var currency = country.currencies[0];
				countriesWithCurrency.push({
					'ccode': country.ccode,
					'currencyCode' : currency.code,
					'symbol' : currency.symbol ? currency.symbol : '',
					'name': country.name
				});
			}
		});
		//console.log('countriesWithCurrency',countriesWithCurrency.length);
		return countriesWithCurrency;
	});
}

// inner helper
function merged() {
	return resolveCountryCodes().then((cCodes) =>
	{
		return resolveCountryData(cCodes);
	})
	.then((theCountryData) => {
		//console.log(theCountryData);
		return theCountryData;
	})
}

// export getCountryCodes. It returns a promise.
export default function getCountryCodes() {
	return merged();
};

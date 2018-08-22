import fetchCountryCodes from './codeData';

function resolveCountryCodes() {
	return fetchCountryCodes()
	.then((countryCodesJs) => {
		var countryCodes = Object.keys(countryCodesJs).map(function (key) {
			return {'ccode': key, 'name': countryCodesJs[key]};
		});
		countryCodes.sort((a, b) => {
//			return (a.ccode < b.ccode ? -1 : (a.ccode > b.ccode ? 1 : 0));
			return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
		});
		//console.log('countryCodes',countryCodes.length);
		return countryCodes;
	});
}

function resolveCountryData(cCodes) {
	return fetch('https://restcountries.eu/rest/v2/all')
	.then((response) =>{
		return response.text();
	})
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
export default function getCountryCodes() {
	return merged();
};

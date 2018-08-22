import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './question1/Q1.css';

import Container from './question1/Container';
import getCountryCodes from './question1/countryCodes';
import TestComponentCorrect from './question2/TestComponent';
import SeriesCalculator from './question3/SeriesCalculator';

// Question 1
getCountryCodes().then(countryCodes => {
	ReactDOM.render(<Container countryCodes={countryCodes}/>, document.getElementById('currencyConversion'));
})
// TODO the above component ought to look after it's own retrieval of country codes and be more self contained.

// Question 2
ReactDOM.render(<TestComponentCorrect />, document.getElementById('testComponent'));

// Question 3
ReactDOM.render(<SeriesCalculator />, document.getElementById('series'));

// Question 4 is described in the index.html

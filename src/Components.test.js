import React from 'react';
import ReactDOM from 'react-dom';
import Amount from './Amount';
import AmountOutput from './AmountOutput';

it('Amount renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Amount />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('AmountOutput renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<AmountOutput />, div);
	ReactDOM.unmountComponentAtNode(div);
});



import React from 'react';
import ReactDOM from 'react-dom';
import BillSystem from './BillSystem';
 let items=[
	 {
		value:'item1',
		label:'Item 1',
		itemtype:'grocery',
		price:500,
		discount:5,
		clearableValue: false
	 },
	 {
	 	value:'item2',
	 	label:'Item 2',
		itemtype:'non-grocery',
		price:400,
		discount:0,
		clearableValue: false
	 },
	 {
	 	value:'item3',
	 	label:'Item 3',
		itemtype:'grocery',
		price:300,
		discount:5
	 },
	 {
	 	value:'item4',
	 	label:'Item 4',
		itemtype:'non-grocery',
		price:200,
		discount:0
	 },
	 {
	 	value:'item5',
	 	label:'Item 5',
		itemtype:'grocery',
		price:100,
		discount:5
	 }
  ]

 class Bill extends React.Component{ 
   render() {
      return (
         <div>
           <h1> Billing System</h1>
          <BillSystem items={items}/>
         </div>
      );
   }
}
ReactDOM.render(
  <Bill  />,
  document.getElementById('bill')
);
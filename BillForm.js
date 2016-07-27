import React from 'react';
import ReactDOM from 'react-dom';

export default class BillForm extends React.Component{ 
   render() {
      return (
         <tr>
           <td>{this.props.item.itemname}</td><td>{this.props.item.itemtype}</td><td> {this.props.item.quantity}</td><td>{this.props.item.acp}</td><td>{this.props.item.discount}%</td><td> {this.props.item.orgp}</td>
         </tr>
      );
   }
}

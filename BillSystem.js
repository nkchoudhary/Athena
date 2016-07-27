import React from 'react';
import ReactDOM from 'react-dom';
import BillForm from './BillForm';

export default class BillSystem extends React.Component{ 
	constructor() {
    super();
         this.state = {
              items: [],
              itemtype:null,
              totalprice:null,
              discountprice:null
         };
     }
     itemAdd(event){
         event.preventDefault();
        var itemname = this.refs.itemname.value;
        var itemtype = this.state.itemtype;
         var quantity = this.refs.quantity.value;
            if(itemname.length < 1 || itemname=="0"){
		      return alert('Please select your item');
		    }
		    if(itemtype.length < 1){
		      return alert('Please select your item type');
		    }
		    if(quantity.length < 1 || quantity < 1 ){
		      return alert('Please enter quantity');
		    }
		    var price=null;
		    var disc=0;
		    var itm_loop=this.props.items;
		     for(var i = 0; i < itm_loop.length; i++){
			      if(itemname==itm_loop[i].value)
			      {
			      	 price= itm_loop[i].price ;
			      	 disc=  itm_loop[i].discount ;
			      }
		      }
		    var aprice=price * quantity;
            var orgp= aprice - (aprice *(disc/100));
	        var data =({
		      id:new Date().getTime(),
		      itemname: itemname,
		      itemtype:itemtype,
		      quantity:quantity,
		      acp:aprice,
		      discount:disc,
		      orgp:orgp
		    });
		    var result=this.state.items;
		    for(var i = 0; i < result.length; i++){
		    	if(result[i].itemname == itemname)
		    	{
		    		var qty=parseInt(quantity)+parseInt(result[i].quantity)  ;
	  				var aprice=price * qty;
	  				var disc= result[i].discount;
	  				var orgp= aprice - (aprice *(disc/100));
		    		result[i].quantity= qty ;
		    		result[i].acp= aprice ;
		    		result[i].orgp= orgp ;
		    		 return this.setState({ items: result });
		    	}
	           
	          }
	        var newItems = this.state.items.concat([data]); 
		    this.setState({ items: newItems });
		     this.setState({ totalprice: null });
			  this.setState({ discountprice: null });
		   
		  }
 	submitBill(event){
        event.preventDefault();
        var username = this.refs.username.value;
        var type = this.refs.type.value;
	      if(username.length < 1){
		      return alert('Please enter user name');
		    }
		    if(type.length < 1 || type=="0"){
		      return alert('Please select user type');
		    }
		    if(this.state.items.length < 1){
		      return alert('Please add item to cart');
		    }
		     var itm_loop=this.state.items;
		     var totalprice=0;
		     for(var i = 0; i < itm_loop.length; i++){
			        totalprice= parseInt(totalprice) + parseInt(itm_loop[i].orgp) ;
			  }
			  var disc_price=null;
			  if(type=="employee")
			  {
			  	disc_price=totalprice-(totalprice * (30/100));
			  }
			  else if(type=="affiliate")
			  {
			  	disc_price=totalprice- (totalprice * (10/100));
			  }
			  else
			  {
			  	disc_price=totalprice;
			  }
			  this.setState({ totalprice: totalprice });
			  this.setState({ discountprice: disc_price });
	      
	  }
	  changeType(){
         var itm_loop=this.props.items;
	     for(var i = 0; i < itm_loop.length; i++){
		      if(this.refs.itemname.value==itm_loop[i].value)
		      {
		      	 this.setState({ itemtype: itm_loop[i].itemtype });
		      }
	      }
      }
	  
   render() {
	   	var result=[];
	    var itm_loop=this.props.items;
	     for(var i = 0; i < itm_loop.length; i++){
	      result.push(<option key={itm_loop[i].value}>{itm_loop[i].value}</option>);
	      }
	   
	   	var hder = this.state.items.length > 0 ? <tr><th>Item Name</th><th>Item type</th><th>Quantity</th><th>Actual price</th><th>Discount</th><th>Payable price</th></tr> : null;
        var total=this.state.totalprice ? "total price:- "+ this.state.totalprice : null;
        var discount=this.state.discountprice ? "Price after Discount:- "+ this.state.discountprice : null;
        var typeval= this.state.itemtype ? <div className="cmmn_typ">
                <label>Item Type:</label>
                <span className="txtcolor">{this.state.itemtype}</span>
              </div> : "";



      return (
         <div>
           <h3> User Details</h3>
             <form  >
             <div className="usr_del">
              <div className="cmmn_typ">
                <label>Name:</label>
                <input type="text" name="username" ref="username"/>
              </div>
             
              <div className="cmmn_typ">
                <label>Type:</label>
                <select name="type" ref="type">
                  <option value="0">Select one</option>
				  <option value="employee">Store Employee</option>
				  <option value="affiliate">Affiliateto Store</option>
				  <option value="other">Other</option>
				</select>
              </div>
              </div>
              
              <h3> Item Details</h3>
              
              <div className="cmmn_typ">
              <label>Item Name:</label>
              <select ref="itemname" onChange={this.changeType.bind(this)}>
              <option value="0">Select one</option>
              {result}
              </select>
              </div>
              {typeval}
              <div className="cmmn_typ">
                <label>Quantity:</label>
                <input type="number" min="1" name="quantity" ref="quantity" />
              </div>
              <br/>
              <div className="add_cart" >
                <button onClick={this.itemAdd.bind(this)}>Add Item to Cart</button>
              </div>
              <h3> Cart</h3>
                <div>
               <table>

                 <tbody>
                  	{hder}			
                   {this.state.items.map((item)=>{
						return <BillForm item={item} key={item.id} />
					})
					}
				  </tbody>
				</table>
                </div>
              <div  className="sbmt">
                <input type="submit" value="Calculate price" onClick={this.submitBill.bind(this)} />
              </div>
            </form>
            <div className="ttl_discnt"><span className="ttl">{total}</span><span className="discnt">{discount}</span></div>
         </div>
      );
   }
}

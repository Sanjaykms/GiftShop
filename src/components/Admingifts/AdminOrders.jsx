import React from 'react';
import classes from './AdminOrders.module.css';
export default function AdminOrders(props) {

    const data = [
        {orderId:"jfdhjfd-fhf-17",userId:"User1",productName:"Led key chain",productPrice:"$200",productQuantity:"3 ps"},
        {orderId:"jfdhjfd-fhf-166",userId:"User2",productName:"Key chain",productPrice:"$20",productQuantity:"10 ps"},
        {orderId:"jfdhjfd-fhf-160",userId:"User3",productName:"Led key lamp",productPrice:"$50",productQuantity:"2 ps"},
        {orderId:"jfdhjfd-fhf-221",userId:"User4",productName:"Printed Bottle",productPrice:"$30",productQuantity:"4 ps"}
      ]

return (
   <div className='square'>
         <div className={classes.headerDiv}>
         <div className={classes.headerLabel}><label>Order Id</label></div>
         <div className={classes.headerLabel}><label>User Id</label></div>
         <div className={classes.headerLabel}><label>Product Name</label></div>
         <div className={classes.headerLabel}><label>Price</label></div>
         <div className={classes.headerLabel}><label>Quantity</label></div>
       </div>
   <br/><br/><br/><br/><br/><br/>
      {data.map((item,cou) =>
     <div key={cou} className={classes.componentdiv}>
     <div className={classes.labeldiv}><label>{item.orderId}</label></div>
     <div className={classes.labeldiv}><label>{item.userId}</label></div>
    <div className={classes.labeldiv}><label>{item.productName}</label></div>
     <div className={classes.labeldiv}><label>{item.productPrice}</label></div>
    <div className={classes.labeldiv}><label>{item.productQuantity}</label></div>
     </div>
      )}
   </div>
)
}
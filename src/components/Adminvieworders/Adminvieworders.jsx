import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link} from 'react-router-dom';
import { FaEdit , FaTrash} from "react-icons/fa"

function Adminvieworders(){
    return(
<div class=" text-center " >
<nav class="navbar navbar-expand-lg navbar-dark bg-primary text-light">
    <div class="container-fluid  text-center">
    <a class="navbar-brand text-center"  href="#">Gifts</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <div class="navbar-nav ">
      <a class="nav-link active" aria-current="page" href="#">Theme</a>
      <a class="nav-link active" aria-current="page" href="#">Orders</a>
      <Link to="/Signup" class="nav-link">Logout</Link>
      </div>
   </div> 
</div>
</nav>
<br></br>


<table class="table">
  <tbody class="bg-primary text-light w-75  mx-auto rounded-3 mb-3 h4">
    <tr class="mb-3 h4">
      <td scope="col" id="orderid">Order Id</td>
      <td scope="col" id="userid"> User Id</td>
      <td scope="col" id="giftName">Gift Name</td>
      <td scope="col" id="giftPrice">Price</td>
      <td scope="col" id="giftQuantity"> Quantity</td>
    </tr>
  </tbody>
  
  <tbody>
  <br></br>
  <br></br>
    <tr class="mb-3 h4">
      <td scope="row">ihijij-jhu-kij</td>
      <td>User1</td>
      <td>Acrylic board</td>
      <td>Rs.200</td>
      <td>2Ps</td>
    </tr>

    <br></br>
    <br></br>
    <tr class="mb-3 h4">
      <td scope="row" class="mb-3">ihijij-jhu-kijjh</td>
      <td class="mb-3">User2</td>
      <td class="mb-3 "> Wooden Board</td>
      <td class="mb-3">Rs.100</td>
      <td class="mb-3 ">3Ps</td>
    </tr>
  </tbody>
</table>



</div>







    );
}
export default Adminvieworders;
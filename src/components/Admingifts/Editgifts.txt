import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link} from 'react-router-dom';
import { FaEdit , FaTrash} from "react-icons/fa"

function Editgifts(){
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



<div class="container-fluid mb-5">
<div class="row " >

<div class="col-4">


</div>



<div class="col-4 bg-info">
<br></br>
<div class="h4 mb-5 rounded-3 text-light">Edit Gift</div>
<div class="input-group   mb-5">
  <input type="text" class="form-control" id="editGiftName" placeholder="enter the gift name"></input>
</div>

<div class="input-group   mb-5">
  <input type="text" class="form-control" id="editGiftPrice" placeholder="enter the gift price"></input>
</div>

<div class="input-group   mb-5">
  <input type="text" class="form-control" id="editImageUrl" placeholder="enter the gift image url"></input>
</div>

<div class="input-group   mb-5">
  <input type="text" class="form-control" id="editGiftQuantity" placeholder="enter the gift quantity"></input>
</div>

<div class="input-group   mb-5">
  <input type="text" class="form-control" id="editGiftDetails" placeholder="enter the gift details"></input>
</div>
<button type="button" class="btn btn-primary rounded-3" id="updateGiftButton">Update</button>
<br></br>
<br></br>
</div>

</div>



<div class="col-4">

</div>


</div>
</div>






    );
}
export default Editgifts;
<template>
 <div>
   <h1>Register Your Account</h1>
   <form @submit.prevent="register">
     <div class="row">
       <div class="col-md-6">
         <div class="form-group">
           <label>Username:</label>
           <input type="text" class="form-control" v-model="user.username">
         </div>
       </div>
       </div>
       <div class="row">
         <div class="col-md-6">
           <div class="form-group">
           <label>Password:</label>
           <input type="text" class="form-control" v-model="user.password">
           </div>
         </div>
       </div>
       <div class="form-group">
         <button class="btn btn-primary">Register</button>
       </div>
   </form>
 </div>
</template>
<script>
   export default {
       data(){
       return {
         user:{}
       }
   },
   methods: {
     addUser(){
       console.log(this.user);
     }
   }
 }
</script>
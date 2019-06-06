<template>
   <div class="container">
       <div class="row">
           <div class="col-md-6 mt-5 mx-auto">
               <form v-on:submit.prevent="login">
                   <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                   <div class="form-group">
                       <label for="email">Email Address</label>
                       <input type="email" v-model="email" class="form-control" name="email" placeholder="Enter Email">
                   </div>
                   <div class="form-group">
                       <label for="password">Password</label>
                       <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
                   </div>
                   <button class="btn btn-lg btn-primary btn-block" type="button" @click="authenticate">Sign in</button>
                   <p v-if="flag === '1'">Login Success</p>
               </form>
           </div>
       </div>
       <authenticator :user="email" :pass="password" ref="authenticator" @resultEvent="result"></authenticator>
   </div>
</template>

<script>
import axios from 'axios'
import Authenticator from "./authenticator";

export default {
    components: {Authenticator},
    data () {
   return {
     email: '',
     password: '',
     flag:''
   }
 },

 methods: {
   authenticate(){
        this.$refs.authenticator.authenticate();
   },
    result(value){
       this.flag = value;
    },
   login () {
     axios.post('users/login', {
       email: this.email,
       password: this.password
     }).then(res => {
       localStorage.setItem('usertoken', res.data)
       this.email = ''
       this.password = ''
       router.push({ name: 'Profile' })
     }).catch(err => {
       console.log(err)
     })
     this.emitMethod()
   },
   emitMethod () {
   }
 }
}
</script>
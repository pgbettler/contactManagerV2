// CreateContactComponent.vue

<template>
  <div>
    <h1>Create A Contact</h1>
    <form @submit.prevent="addContact">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>First Name:</label>
            <input type="text" class="form-control" v-model="contact.fname">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
            <label>Last Name:</label>
            <input type="text" class="form-control" v-model="contact.lname">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
            <label>Phone Number:</label>
            <input type="text" class="form-control" v-model="contact.number">
            </div>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div>
    </form>
  </div>
</template>

<script>
    export default {
        data(){
        return {
          contact:{}
        }
    },
    methods: {
      addContact(){
        console.log(this.contact);
      }
    }
  }
</script>

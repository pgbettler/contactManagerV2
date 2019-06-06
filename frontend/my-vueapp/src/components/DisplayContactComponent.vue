<template>
 <div>
   <h1>This is the Display Contact Component</h1>
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
     editContact(){
       console.log(this.contact);
     }
   }
 }
</script>
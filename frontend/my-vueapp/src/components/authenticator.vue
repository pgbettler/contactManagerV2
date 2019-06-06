<template>
    <div></div>
</template>

<script>
    export default {
        props: ['user', 'pass'],
        name: "authenticator",
        data: function() {
            return{
                success:'0',
                users: {
                    username:'Narwhal123@gmail.com',
                    password:'password'
                }
            }

        },

        methods: {
            authenticate(){
                if(this.users.username === this.user){
                    this.success = '1';
                }
                this.$emit('resultEvent', this.success);
                this.success = '0'
            }
        }
    }
</script>

<style scoped>

</style>
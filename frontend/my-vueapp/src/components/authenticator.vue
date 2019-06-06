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
                    username:'Narwhal23@gmail.com',
                    password:'password'
                }
            }

        },

        methods: {
            authenticate(){
                if(this.username === this.user && this.password === this.pass){
                    this.success = '1';
                }
                this.$emit('resultEvent', this.success);
                this.success='0'
                console.log("narwhal")
            }
        }
    }
</script>

<style scoped>

</style>
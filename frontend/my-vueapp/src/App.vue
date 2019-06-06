<template>
<div id="app">
  <header>
  <div class="topnav">
    <a class="logoimage" routerLink="/"><img src="./assets/narwhallogo.png"/></a>
    <div class="topnav-right">
      <router-link to="/">Home</router-link>
      <a href="https://github.com/pgbettler/Contact_Manager/tree/master" target="_blank">Github</a>
    </div>
  </div>
</header>
    <router-view></router-view>
</div>
</template>

<script>
import HomeComponent from './components/HomeComponent.vue';
export default {
  name: 'app',
  components: {
    HomeComponent
  }
}
</script>

<style>
body {
    background-image: url("../src/assets/underwater.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
    .topnav {
        overflow: hidden;
        background-image: linear-gradient(#55C2D7,#317B94) ;
        box-shadow: 0 4px 8px 0 #07889B, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .logoimage {
    padding: 0px 300px 500px 0px;
    }
    .topnav:hover {
    transition: .5s;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    /* Style the links inside the navigation bar */
    .topnav h1 {
    float: left;
    text-align: center;
    padding: 14px 30px;
    text-decoration: none;
    font-size: 40px;
    }
    router-link {
        color: white;
        text-decoration: none;
    }
    /* Add a color to the active/current link */
    .topnav a.active {
    color: white;
    }
    /* Right-aligned section inside the top navigation */
    .topnav-right {
    float: right;
    padding: 30px 80px;
    }
    .topnav-right a {
        font-size: 30px;
        padding: 14px;
    }
</style>
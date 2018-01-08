<template>
    <div id="app">
        <router-view></router-view>
        <Fot></Fot>
    </div>
</template>
<script>
    import Fot from './components/footer'
    export default {
        name: 'app',
        components: {
            Fot
        }

    }
</script>
<style lang="stylus">
    @import "common/style/common.styl";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/
    }
</style>

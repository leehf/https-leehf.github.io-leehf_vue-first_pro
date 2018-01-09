<template>
    <div>
        <nav class="nav">
            <router-link class="logo" to="/index"><img src="http://yueeyou.com/img/logo.png" alt=""></router-link>
            <ul>
                <li v-for="(obj,index) in tabs" :class="{curr :index==active}" @click="choose(obj.index)">
                    <router-link :to="obj.url"
                                 :key="index">
                        {{obj.text}}
                        <span>{{obj.EnText}}</span>
                    </router-link>
                </li>
                <!-- <li>
                     <router-link to="/game" :class="{active:item.active}">代理游戏
                         <span>AGENT GAME</span>
                     </router-link>
                 </li>
                 <li>
                     <router-link to="/func" :class="{active:item.active}">关于我们
                         <span>ABOUT</span>
                     </router-link>
                 </li>-->
            </ul>
        </nav>
    </div>
</template>
<script>
    export default {
        name: 'nav',
        props: ['activeIndex'],
        data () {
            return {
                active: this.activeIndex,
                tabs: [
                    {
                        url: "/index",
                        text: "首页",
                        index: 0,
                        EnText: "HOME"

                    },
                    {
                        url: "/game",
                        text: "代理游戏",
                        index: 1,
                        EnText: "AGENT GAME"
                    },
                    {
                        url: "/about",
                        text: "关于我们",
                        index: 2,
                        EnText: "ABOUT"
                    }
                ]

            }
        },
        methods: {
            choose: function (index) {
                /* tabs.map(function (v, i) {
                 debugger
                 v.url == url ? v.selected = true : v.selected = false;
                 });*/
                console.log(index);
//                debugger;
                this.active = index;
            }
        }

    }
</script>
<style scoped>
    div {
        width: 100%;
        background: #fff;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 156;
        border-bottom: 2px solid #e75208;
    }

    li {
        list-style: none;
    }

    nav {
        width: 1200px;
        margin: 0 auto;
        height: 100px;
    }

    .logo {
        margin: 0 0 0 0;
        display: block;
        float: left;
        line-height: 100px;
    }

    .logo img {
        vertical-align: middle;
    }

    ul {
        float: right;
    }

    ul li {
        float: left;
        margin: 25px 18px 0;
        line-height: 24px;
        _margin-right: 8px;
        min-width: 120px;
        text-align: center;
    }

    ul li a {
        width: 100%;
        display: block;
        line-height: 30px;
        color: #3a3a3a;
        font-size: 20px;
        text-align: center;
        text-decoration: none;
    }

    ul li a span {
        width: 100%;
        display: block;
        line-height: 20px;
        text-align: center;
        font-size: 10px;
        color: #686868;
    }

    ul li a:hover {
        color: #ff7800
    }

    .curr a {
        color: #ff7800
    }

    ul li a:hover {
        -webkit-transition: all .1s ease-out;
        -moz-transition: all .1s ease-out;
        -ms-transition: all .1s ease-out;
        -o-transition: all .1s ease-out;
        transition: all .1s ease-out;
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1)
    }

    ul li a:hover span, .curr span {
        color: #000
    }
</style>

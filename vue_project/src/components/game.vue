<template>
    <div>
        <na :activeIndex="activeIndex"></na>
        <div class="typeChoose">
            <div class="clearfix">
                <span class="fl typeSpan">游戏类型</span>
                <ul class="type fl clearfix">
                    <li v-for="(obj,index) in data.categorys" :class="{curr:obj.name===category}" :data-id="obj.id" class="fl" v-if="data.categorys.length>0" @click="typeChoose(obj.name,obj.id)">
                        {{obj.name}}
                    </li>
                </ul>
            </div>
            <div class="clearfix">
                <span class="fl timeSpan">上线时间</span>
                <ul class="time fl clearfix">
                    <li v-for="(obj,index) in data.years" :class="{curr:obj===createDate}" class="fl" v-if="data.years.length > 0" @click="yearChoose(obj)">
                        {{obj}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="content clearfix">
            <div class="fr rmyx">
                <div class="Rgame" :class="{fid:ad_Num==2}">
                    <h2>热门游戏</h2>
                    <ul>
                        <li v-for="(obj,index) in ad.list" v-show="index <= ad_Num">
                            <a target="_blank" :href="obj.href1">
                                <img :src="obj.bigImg" alt="">
                                <div class="lay"></div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="gameList">
                <ul>
                    <li v-for="(obj,index) in games.list" v-if="games.list.length > 0">
                        <div class="bg"><span class=""></span></div>
                        <div class="bgRight"><span class=""></span></div>
                        <div class="clearfix" href="javascript:">
                            <div class="img fl">
                                <img :src="obj.icon" alt="">
                            </div>
                            <div class="text fl">
                                <h3><span class="tit">{{obj.name}}</span>
                                    <span v-for="(oType,key) in obj.typeList">{{oType}}</span>
                                </h3>
                                <p>{{obj.intro}}</p>
                            </div>
                            <div class="download fr" :class="{one:obj.downloadUrlAndroid===''|| obj.officialUrl===''}">
                                <a class="enter" target="_blank" :href="obj.officialUrl" v-if="obj.officialUrl">进入官网</a>
                                <a class="down" target="_blank" :href="obj.downloadUrlAndroid" v-if="obj.downloadUrlAndroid">游戏下载</a>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-if="games.list=='undefined'">
                    <img src="http://yueeyou.com/img/no.png" alt="">
                    <p>没有匹配内容</p>
                    <a href="javascript:" onclick="location.reload()">重新试试</a>
                </div>
            </div>
            <div v-show=" pageNum<games.pages" v-if="" class="loadMore fl" @click="moreLoad()">
                点击加载更多 <i class="background-icon"></i>
            </div>
        </div>
        <!--      <div v-for="(obj,index) in res.data.articles" v-if="index >= 0" v-html="obj.content">
              </div>-->
    </div>
</template>
<script>
    import axios from 'axios'//更好突显此组件中引入该方法
    import na from './nav'
    export default {
        name: 'game',
        components: {
            na
        },
        data () {
            return {
                data: "",
                category: "全部",
                id: "",
                createDate: "全部",
                games: "",
                scroll: "",
                ad: "",
                ad_Num: 5,
                pageNum: 1,
                activeIndex: 1
            }
        },
        created(){
            var that = this;
            axios.get("http://op.yueeyou.com/portal/api/gameCategorys").then(function (res) {
                console.log(res.data);
                res.data.data.categorys.unshift({name: "全部"});
                res.data.data.years.unshift("全部");
                that.data = res.data.data;
            }),
                axios.get("http://op.yueeyou.com/portal/api/ad?type=GAME_HOT_GAME").then(function (res) {
                    console.log(res.data);
                    that.ad = res.data.data.ad;
                })
        }
        ,
        mounted()
        {
            this.ajax();
            this.scroll=0;
            window.addEventListener('scroll', this.scrol)
        }
        ,
        methods: {
            scrol()
            {
                this.scroll = document.body.scrollTop || document.documentElement.scrollTop;
                const rm_game_height = document.querySelector(".Rgame").offsetTop;
                this.scroll > rm_game_height ? this.ad_Num = 2 : this.ad_Num = 5;
                console.log(this.scroll)
            },
            typeChoose(str, id)
            {
                this.pageNum = 1;
                this.category = str;
                this.id = id;
                this.ajax();
            }
            ,
            yearChoose(str)
            {
                this.pageNum = 1;
                this.createDate = str;
                this.ajax();
            }
            ,
            moreLoad()
            {
                this.pageNum++;
                this.ajax(true);
            }
            ,
            ajax(flag)
            {
                var that = this;
                typeof(flag) == "undefined" ? flag = "" : flag;
                axios.get("http://op.yueeyou.com/portal/api/games", {
                    params: {
                        category: that.category == "全部" ? "" : that.id,
                        createDate: that.createDate == "全部" ? "" : that.createDate,
                        pageNum: that.pageNum
                    }
                }).then(function (res) {
//                    debugger
                    flag == "" ? that.games = res.data.data.games : that.games.list = that.games.list.concat(res.data.data.games.list);

                })
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import "../common/style/game.styl";
</style>


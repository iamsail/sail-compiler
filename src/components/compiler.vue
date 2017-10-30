<template>
    <div class="hello">
        <el-row type="flex" class="row-bg" justify="space-around" >
            <el-col :span="10"><div class="grid-content  bg-purple">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 30, maxRows: 50}"
                        placeholder="enter your code"
                        v-model="textarea3"
                >
                </el-input>

            </div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple-light">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 30, maxRows: 50}"
                        placeholder="the result"
                        v-model="textarea2"
                >
                </el-input>
            </div></el-col>
        </el-row>

        <div style="margin: 20px 0;"></div>

        <el-button-group>
            <el-button type="primary" size="medium"   v-on:click="compile"   icon="el-icon-caret-right"></el-button>
            <el-button type="primary" size="medium"  v-on:click="del" icon="el-icon-delete"></el-button>
        </el-button-group>
        <div style="margin: 20px 0;"></div>
        <h2>{{myInfo}}</h2>
    </div>
</template>

<script>
//    let {start} = require ('../compiler/start');
    import {start}  from '../compiler/start';
    export default {
        name: 'compiler',
        data() {
            return {
                myInfo: "李长航 计科二班 08153398",
                textarea2: '',
                textarea3: ''
            }
        },
        methods:{
            compile:function(){
                let temp = start(this.textarea3);

                if(!temp.error){
                    let resultString="";
                    temp.info.forEach(function(item){
                        resultString += `(${item.type},${item.value})\n`;
                    });
                    this.textarea2 =  resultString;
                }
                else{
                    let resultString="";
                    resultString += temp.info;
                    this.textarea2 =  resultString;
                }

            },
            del:function(){
                this.textarea2 = "";
                this.textarea3 = "";
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .error{
        background: red;
    }
</style>









<template>
    <div class="hello">
        <el-row type="flex" class="row-bg" justify="space-around" >
            <el-col :span="6"><div class="grid-content  bg-purple">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 30, maxRows: 50}"
                        placeholder="enter your code"
                        v-model="textarea3"
                >
                </el-input>

            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 30, maxRows: 50}"
                        placeholder="词法分析"
                        v-model="textarea2"
                >
                </el-input>
            </div></el-col>


            <el-col :span="7"><div class="grid-content bg-purple-light">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 30, maxRows: 50}"
                        placeholder="递归下降语法分析"
                        v-model="textarea4"
                >
                </el-input>
            </div></el-col>


            <el-col :span="10"><div class="grid-content bg-purple-light">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 30, maxRows: 50}"
                        placeholder="LR语法分析"
                        v-model="textarea5"
                >
                </el-input>
            </div></el-col>
        </el-row>

        <div style="margin: 20px 0;"></div>

        <el-button-group>
            <el-button type="primary" size="medium"  v-on:click="compile"   icon="el-icon-caret-right"></el-button>
            <el-button type="primary" size="medium"  v-on:click="del" icon="el-icon-delete"></el-button>
            <el-button type="primary" size="medium"  v-on:click="lr" icon="el-icon-success"></el-button>
        </el-button-group>
        <div style="margin: 20px 0;"></div>
        <h2>{{myInfo}}</h2>
    </div>
</template>

<script>
    import {start}  from '../compiler/start';
//    import {program}  from '../compiler/RecursiveDecline/program';
    import {program}  from '../compiler/RecursiveDecline/program';
    import {startLR}  from '../compiler/LRSyntaxAnalysis/one';
    export default {
        name: 'compiler',
        data() {
            return {
                myInfo: "李长航 计科二班 08153398",
                textarea2: '',
                textarea3: '',
                textarea4: '',
                textarea5: ''
            }
        },
        methods:{
            compile:function(){
                let temp = start(this.textarea3);

                if(!temp.error){
                    let startString="词法分析结果如下:\n";
                    let tempString = "";
                    temp.info.forEach(function(item){
                        tempString += `(${item.type},${item.value})\n`;
                    });
                    let resultString = `${startString}${tempString}`;
                    this.textarea2 =  resultString;
                    let tempArray = temp.info;
                    console.log("这儿呢");
                    this.analysis(tempArray);
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
                this.textarea4 = "";
                this.textarea5 = "";
            },
            analysis:function (tempArray) {
                let errorInfo = "语法分析失败";
                let startString ="语法分析结果如下:\n";
                this.textarea4 = `${startString}${errorInfo}`;
                let analysisResult = program(tempArray);
                if(!analysisResult.error){
                    console.log("语法分析成功");
                }else{
                    console.log("语法分析失败");
                }
//                console.log(`语法分析结果如下\n ${analysisResult} \n=============\n`);
                this.textarea4 = `${startString}${analysisResult.info}`;
            },
            lr:function () {
                let temp = start(this.textarea3);
                if(!temp.error){
                    let startString="词法分析结果如下:\n";
                    let tempString = "";
                    temp.info.forEach(function(item){
                        tempString += `(${item.type},${item.value})\n`;
                    });
                    let resultString = `${startString}${tempString}`;
                    this.textarea2 =  resultString;
                    let tempArray = temp.info;
                }
                else{
                    let resultString="";
                    resultString += temp.info;
                    this.textarea2 =  resultString;
                }

                let tempTextarea3 = this.textarea3;
                let finnalFLstr = startLR(tempTextarea3);
                this.textarea5 = finnalFLstr;
                finnalFLstr = '';
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








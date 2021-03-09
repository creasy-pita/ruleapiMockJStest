<template>
    <button value="showmockdata" name="showmock" @click="this.showdata()">showmockdata</button>
    <button  @click="this.RuleDataPrepareAndCheck()">RuleDataPrepareAndCheck</button>
    <button value="getAssertRuleData" name="getAssertRuleData" @click="this.getAssertRuleData()">getAssertRuleData</button>

</template>
<script>
    import axios from "axios"
    import Mock from "mockjs"
    export default {
        name: 'apitest',
        props: {
            msg: String
        },
        data: function(){
            return {
                listParams : {
                    pageIndex: 0,
                    pageSize: 10
                }
            }
        },
        methods:{
            getListByTemplate:function(size, template){
                var list = [];
                for (var i = 0; i < size; i++) {
                    list.push(template);
                }
                return list;
            },
            showdata:function(){
                // axios.post('http://localhost:8080/api/list', JSON.stringify(this.listParams))
                //     .then(function (response) {
                //     console.log(response.data);
                // });
                axios.post('http://localhost:8080/api/list')
                    .then(function (response) {
                        console.log(response.data);
                    });
            },
            RuleDataPrepareAndCheck:function(){
                var Random = Mock.Random;
                //发起规则平台  assertrule api接口的请求
                //obj 部分

                var scoreReportsTemplate = {
                    // "average": Random.integer(40,80),
                    "average|5-20": 16,
                    "subject|1": ["math","english","gym"],//math english gym
                    "score": Random.integer(50,100),
                    "IsPublic|1": true  //1/2概率出现true
                };
                var scoreReports = this.getListByTemplate(2, scoreReportsTemplate);
                var boysTemplate = {
                    "name|1":["piece","creasypita","Tom","john"]
                    ,"age":Random.integer(10,50)
                    ,"scoreReports":scoreReports
                };
                var boys = this.getListByTemplate(20, boysTemplate);
                var obj = Mock.mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                    "boys":boys,
                    "姓名":"hello",
                    "field1":"aa",
                    "schoolobj1":{
                        "schoolobj11":{
                            "field1":"aa",
                            "field2":"aa"
                        }
                    },
                    "name": "102",
                    "age": 4
                });

                //assertEntry部分
                var request = {
                    "assertEntry": {
                        "10738":true,
                        "10739": true,
                        "10747":true,
                        "10748":true
                    },
                    obj,
                    "objKeys": [
                        "name",
                        "age",
                        {
                            "boys.scoreReports": [
                                "subject",
                                "average",
                                "score"
                            ]
                        },
                        {
                            "boys": [
                                "name",
                                "age"
                            ]
                        }
                    ]
                }

                // 输出结果
                console.log(JSON.stringify(request, null, 4))
                //发起请求  rulesengine rulesengine
                // axios.post('http://192.168.100.66:19011/ruleexcutor/assertRule',request)
                axios.post('http://localhost:8080/ruleexcutor/assertRule',request)
                    .then(function (response) {
                        console.log(response.data);
                    });
            },

            getAssertRuleData:function(){
                axios.post('http://localhost:8080/api/assertRuleData')
                    .then(function (response) {
                        console.log(response.data);
                });
            }

        }



    }
</script>

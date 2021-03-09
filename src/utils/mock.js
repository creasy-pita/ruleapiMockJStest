//mock.js file
import Mock from'mockjs' // import mockjs
const Random = Mock.Random // Mock.Random is a tool class used to generate various random data
const dataList = [] // Array used to receive generated data
for (let i = 0; i <2600; i++) {// can customize the number of generated
    const template = {
        'Boolean': Random.boolean, // can generate basic data types
        'Natural': Random.natural(1, 10), // Generate natural numbers between 1 and 100
        'Integer': Random.integer(1, 100), // Generate an integer between 1 and 100
        'Float': Random.float(0, 100, 0, 5), // Generate a floating point number between 0 and 100, with a mantissa of 0 to 5 after the decimal point
        'Character': Random.character(), // Generate a random string, you can add parameters to define rules
        'String': Random.string(2, 10), // Generate a string between 2 and 10 characters
        'Range': Random.range(0, 10, 2), // Generate a random array
        'Date': Random.date(), // Generate a random date, you can add parameters to define the date format
        'Image': Random.image(Random.size,'#02adea','Hello'), // Random.size means that you will choose one data from the size data
        'Color': Random.color(), // Generate a color random value
        'Paragraph': Random.paragraph(2, 5), // Generate text of 2 to 5 sentences
        'Name': Random.name(), // Generate name
        'Url': Random.url(), // Generate web address
        'Address': Random.province() // Generate address
    }
    dataList.push(template)
}
var getListByTemplate= function(size, template){
    var list = [];
    for (var i = 0; i < size; i++) {
        list.push(template);
    }
    return list;
}

// list page interface()
Mock.mock('http://localhost:8080/api/listpage', 'post', (params) => {
    var info = JSON.parse(params.body)
    var [index, size, total] = [info.pageIndex, info.pageSize, dataList.length]
    var len = total / size
    var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
    var newDataList = dataList.slice(index * size, (index + 1) * size)
    return {
        'code': '0',
        'message': 'success',
        'data': {
            'pageIndex': index,
            'pageSize': size,
            'rows': newDataList,
            'total': total,
            'totalPages': totalPages
        }
    }
})
Mock.mock('http://localhost:8080/api/list', 'post', () => {
    return dataList;
})

Mock.mock('http://localhost:8080/api/assertRuleData', 'post', () => {
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
    var scoreReports = getListByTemplate(3, scoreReportsTemplate);
    var boysTemplate = {
        "name|1":["piece","creasypita","Tom","john"]
        ,"age":Random.integer(10,50)
        ,"scoreReports":scoreReports
    };
    var boys = getListByTemplate(4, boysTemplate);
    var obj = {
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
    };
    return obj;
})




export const Test1 = `{
  "name": [{}],
  "age": 123
}`

export const DemoJson1 = `/**
 * 王者英雄
 * @author L&J
 * @sine 2022-3-28 03:03:52
 */
{
  // 姓名 @required
  "name": "张飞",
  // 年龄 
  // @minimum 1
  // @maximum 100
  "age": 123,
  // 经济
  "money": 98700.123,
  // 是否是坦克
  "isTanke": true,
  // 生日 @mock \\@datetime("yyyy-MM-dd HH:mm:ss")
  "birthday": "2022-3-27 23:39:45"
}`

export const DemoJsonSchema = `{
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "姓名"
        },
        "age": {
            "type": "integer",
            "description": "岁数"
        },
        "computers": {
            "type": "array",
            "description": "拥有电脑列表",
            "items": {
                "type": "object",
                "properties": {
                    "brand": {
                        "type": "string",
                        "description": "品牌"
                    },
                    "price": {
                        "type": "number",
                        "description": "价格"
                    }
                }
            }
        },
        "friends": {
            "type": "array",
            "description": "好朋友们",
            "items": {
                "type": "object",
                "description": "朋友信息",
                "properties": {
                    "name": {
                        "description": "姓名",
                        "type": "string",
                        "mock": {
                            "mock": "张飞"
                        }
                    },
                    "age": {
                        "description": "年龄",
                        "type": "integer",
                        "mock": {
                            "mock": "@integer(1,100)"
                        }
                    },
                    "birthday": {
                        "description": "生日",
                        "type": "string",
                        "mock": {
                            "mock": "2022-10-08 21:53:36"
                        }
                    },
                    "isTanke": {
                        "description": "是否坦克",
                        "type": "boolean",
                        "mock": {
                            "mock": "@boolean"
                        }
                    }
                },
                "required": [
                    "name",
                    "age"
                ]
            },
            "required": []
        },
        "nestList": {
            "type": "object",
            "description": "嵌套 List",
            "properties": {
                "list": {
                    "type": "array",
                    "description": "内层 List",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "description": "内容",
                            "properties": {
                                "hahaha": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "required": [],
    "$schema": "http://json-schema.org/draft-04/schema#"
}
`
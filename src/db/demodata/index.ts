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
        "code": {
            "type": "integer",
            "description": "错误码"
        },
        "msg": {
            "type": "string",
            "description": "信息"
        },
        "data": {
            "type": "object",
            "description": "数据",
            "properties": {
                "list": {
                    "type": "array",
                    "items": {
                        "type": "object",
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
                    }
                }
            },
            "required": []
        }
    },
    "required": [],
    "$schema": "http://json-schema.org/draft-04/schema#"
}
`
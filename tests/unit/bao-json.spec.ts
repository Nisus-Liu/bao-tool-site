import {parse, ParseContext} from "bao-json";

describe('BaoJson', () => {

  it('JSON.parse()', () => {

    // const jsonParser = new JsonParser("{}");
    // jsonParser.parse()

    let json = `/**
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
}`;
    const parseContext: ParseContext = parse(json);
    console.log(parseContext);
    // 进一步可以解析 commentMeta, 默认不解析, parseContext.commentMeta 是null
    // 解析后, parseContext.commentMeta 字段有值
    const commentMeta = parseContext.parseComment();
    console.log(commentMeta);

    expect(parseContext).not.toBeNull()
  })
})

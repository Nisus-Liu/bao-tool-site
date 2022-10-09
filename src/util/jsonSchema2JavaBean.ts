
/**
 * 解析 schema, 广度优先遍历, 生成多个对象.
 * 一个 json 路径对应一个对象内容
 */
export default function jsonSchema2JavaBean(jsonSchema: string) {
  // console.log("jsonSchema2JavaBean", jsonSchema)
  // TODO dooooo

  const ret = [];
  ret.push({
    path: "$.data",
    content: "public class ABean {...}"
  })

  return ret;
}

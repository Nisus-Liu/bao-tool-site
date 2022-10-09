/**
 * 解析 schema, 广度优先遍历, 生成多个对象.
 * 一个 json 路径对应一个对象内容
 */
import {isPrimitiveType, JsonType, jsonTypeToJavaType} from "@/util/typeUtil";
import {capitalize, nop} from "@/util/kits";

function handleProperties(properties, queue: any[], path: string): string {
  return Object.keys(properties).map(k => {
    let property = properties[k];
    if (!property) {
      return null;
    }

    const type = property.type;
    if (isPrimitiveType(type)) {
      nop();
    } else if (type == JsonType.OBJECT) {
      queue.push([path + '.' + k, property]);
    } else if (type == JsonType.ARRAY) {
      const items = property['items'];
      // 和 object 很类似, {type,properties,required}
      queue.push([path + '.' + k, items]);
    }

    return `
/**
 * ${property.description ? property.description : ''}
 * ${property.mock ? '@mock' + ' ' + property.mock.mock : ''}
 */
private ${jsonTypeToJavaType(type)} ${k};`;
  }).filter(e => e).join('\n    ')
}

function schemaObjectToJavaBean(jsonSchemaObj, path: string, queue: any[]): string {
  const properties = jsonSchemaObj['properties'];
  return `
public class ${path2ClassName(path)} {
    ${handleProperties(properties, queue, path)}
}
`;
}

export default function jsonSchema2JavaBean(jsonSchema: string) {
  // console.log("jsonSchema2JavaBean", jsonSchema)
  const ret = [];
  if (jsonSchema == null || jsonSchema.trim() == '') {
    return ret;
  }

  jsonSchema = jsonSchema.trim();

  if (!(jsonSchema.startsWith("{") && jsonSchema.endsWith("}"))) {
    throw Error("非法的 JsonSchema");
  }

  const jsonSchemaObj = JSON.parse(jsonSchema);
  if (jsonSchemaObj['$schema'] == null) {
    throw Error("可能不是合法的 JsonSchema, 无 '$schema' 字段");
  }

  const queue = [];
  const path = 'root';

  let type = jsonSchemaObj['type'];
  if (type == JsonType.OBJECT) {
    queue.push([path, jsonSchemaObj]);
  }
  else if (type == JsonType.ARRAY) {
    // ? 根级会是 array ?
    const items = jsonSchemaObj['items'];
    // 和 object 很类似, {type,properties,required}
    queue.push([path, items]);
  } // else: 顶级的, 基本类型, 不生成也无法生成 java bean

  let target = null;
  while ((target = queue.shift())) {
    const clazz = schemaObjectToJavaBean(target[1], target[0], queue);
    ret.push({
      path: target[0],
      content: clazz,
    })
  }

  // ret.push({
  //   path: "$.data",
  //   content: "public class ABean {...}"
  // });

  return ret;
}

function path2ClassName(path: string) {
  const split = path.split(".");
  let s = '';
  split.forEach(e => {
    s += capitalize(e)
  })

  return s;
}


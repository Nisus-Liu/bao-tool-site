export enum JsonType {
  OBJECT = "object",
  ARRAY = "array",
  STRING = "string",
  INTEGER = "integer",
  NUMBER = "number",
  BOOLEAN = "boolean",
}

export enum JavaType {
  OBJECT = "Object",
  ARRAY = "List",
  STRING = "String",
  INTEGER = "Integer",
  NUMBER = "BigDecimal",
  BOOLEAN = "Boolean",
}

export function isPrimitiveType(type: JsonType | string) {
  return !(type == JsonType.OBJECT || type == JsonType.ARRAY);
}

export function jsonTypeToJavaType(type: JsonType | string) {
  switch (type) {
    case JsonType.OBJECT:
      return JavaType.OBJECT;
    case JsonType.ARRAY:
      return JavaType.ARRAY;
    case JsonType.STRING:
      return JavaType.STRING;
    case JsonType.INTEGER:
      return JavaType.INTEGER;
    case JsonType.NUMBER:
      return JavaType.NUMBER;
    case JsonType.BOOLEAN:
      return JavaType.BOOLEAN;
  }
}
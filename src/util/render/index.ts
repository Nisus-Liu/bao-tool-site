import {ItemType, ParseContext} from "bao-json";
import {Json2JavaBeanOptions} from "@/type";

// import {ItemType, ParseContext} from "../index.esm.js";


/**
 * json -> java bean
 * @param context
 * @param config
 */
export function json2JavaBean(context: ParseContext, config: Record<string, unknown> = {}) {
    const options = (config.options || []) as string[];
    // 涉及到 comment 既定配置, 才去 parseComment
    const isJavadocComment = options.indexOf(Json2JavaBeanOptions.JavadocComment) > -1;
    const isValue2CommentIfAbsent = options.indexOf(Json2JavaBeanOptions.Value2CommentIfAbsent) > -1;
    if (isJavadocComment) {
        context.parseComment();
    }

    // // Auto generate at ${new DateFormat().format(DateFormat.DATE_TIME_FMT)}
  return `${isJavadocComment ? toJavadocComment(context.commentMeta?.pureComment) : context.comment?.trim()}
public class JavaBean {
    ${context.children?.map(it => {
    let type = 'Object';
    switch (it.type) {
        case ItemType.STRING:
            type = 'String';
            break;
        case ItemType.BOOL:
            type = "Boolean";
            break;
        case ItemType.INT_NUMBER:
            type = "Integer";
            break
        case ItemType.FLOAT_NUMBER:
            type = "BigDecimal";
            break;
        case ItemType.ARRAY:
            type = "List<?>";
            break;
    }

    return `${getComment(it, isJavadocComment, isValue2CommentIfAbsent)}
    private ${type} ${it.key};`
}).join('\n    ')}
}`;
}

function getComment(it: ParseContext, isJavadocComment, isValue2CommentIfAbsent) {
    let hbCmmt = null;
    if (isValue2CommentIfAbsent && isSimpleType(it.type)) {
        // 简单类型才替补注释
        hbCmmt = it.value;
    }
    if (isJavadocComment) {
        return toJavadocComment(it.commentMeta?.pureComment ? it.commentMeta.pureComment : hbCmmt);
    } else {
        return it.comment ? it.comment.trim() : '// ' + hbCmmt;
    }
}

function isSimpleType(type: ItemType) {
    return !(type == ItemType.OBJECT || type == ItemType.ARRAY)
}

function toJavadocComment(pureCmmt) {
    if (!pureCmmt) {
        return '';
    }
    // 暂不考虑格式化(缩进)
    return '/**\n' + pureCmmt + '\n*/';
}

// ----
const JSON_SCHEMA_DRAFT = "http://json-schema.org/draft-04/schema#"

/**
 * json -> json schema
 * @param context
 * @param isRoot
 */
export function json2Jsonschema(context: ParseContext, isRoot = true) {
    context.parseComment();
    // console.log("--parseComment--> context: ", context)

    let sc = {};
    if (context.commentMeta) {
        sc['description'] = context.commentMeta.pureComment;
    }

    switch (context.type) {
        case ItemType.OBJECT:
            jsonObject2Jsonschema(context, sc);
            break;
        case ItemType.ARRAY:
            jsonArray2Jsonschema(context, sc);
            break;
        default:
            jsonSimple2Jsonschema(context, sc);
    }

    if (isRoot) {
        sc['$schema'] = JSON_SCHEMA_DRAFT;
    }

    return sc;
}

function jsonObject2Jsonschema(context: ParseContext, schemaResult: Record<string, unknown>) {
    if (context.type !== ItemType.OBJECT) {
        throw new Error("jsonObject2Jsonschema 仅支持 ItemType.OBJECT");
    }
    schemaResult['type'] = 'object';
    context.commentMeta && (schemaResult['description'] = context.commentMeta.pureComment);

    const propsSc = schemaResult['properties'] = {}

    const requiredFieldSet = new Set();

    context.children?.forEach(prop => {
        let propSc = {};
        switch (prop.type) {
            case ItemType.OBJECT:
                jsonObject2Jsonschema(prop, propSc);
                break;
            case ItemType.ARRAY:
                jsonArray2Jsonschema(prop, propSc);
                break;
            // case ItemType.STRING:
            //     propSc['type'] = 'string';
            //     break;
            // case ItemType.BOOL:
            //     propSc['type'] = 'boolean';
            //     break;
            // case ItemType.INT_NUMBER:
            //     propSc['type'] = 'integer';
            //     break
            // case ItemType.FLOAT_NUMBER:
            //     propSc['type'] = 'number';
            //     break;
            default:
                jsonSimple2Jsonschema(prop, propSc);
        }
        prop.commentMeta && (propSc['description'] = prop.commentMeta.pureComment);
        propsSc[prop.key + ''] = propSc;

        if (prop.commentMeta?.schemaDescriptor?.['required']) {
            requiredFieldSet.add(prop.key);
        }
    })

    schemaResult['required'] = Array.from(requiredFieldSet);

    return schemaResult;
}

function jsonArray2Jsonschema(context: ParseContext, schemaResult: Record<string, unknown>) {
    if (context.type !== ItemType.ARRAY) {
        throw new Error("jsonArray2Jsonschema 仅支持 ItemType.ARRAY");
    }

    schemaResult['type'] = 'array';
    context.commentMeta && (schemaResult['description'] = context.commentMeta.pureComment);

    // items , 去第一个解析, 多个item, 但类型不一致, 我不管了!
    let itemsSc:any = null;
    if (context.children && context.children.length > 0) {
        const first = context.children[0];
        itemsSc = json2Jsonschema(first, false);
    } else {
        // 缺省一个
        itemsSc = {
            type: 'string'
        }
    }
    schemaResult['items'] = itemsSc;

    return schemaResult;
}

function jsonSimple2Jsonschema(context: ParseContext, schemaResult: Record<string, unknown>) {
    context.commentMeta && (schemaResult['description'] = context.commentMeta.pureComment);
    switch (context.type) {
        case ItemType.STRING:
            schemaResult['type'] = 'string';
            break;
        case ItemType.BOOL:
            schemaResult['type'] = 'boolean';
            break;
        case ItemType.INT_NUMBER:
            schemaResult['type'] = 'integer';
            break
        case ItemType.FLOAT_NUMBER:
            schemaResult['type'] = 'number';
            break;
    }

    /**
     * "mock": {
     *   "mock": "@string"
     * }
     */
    const mock = context.commentMeta?.schemaDescriptor?.['mock'];
    if (mock) {
        schemaResult['mock'] = {mock}
    }

    return schemaResult;
}
/**
 * string | undefined | null 简写
 */
export type StringNN = string | undefined | null;

export enum Option {
  //--- 通用 ---//

  //--- json 2 javabean ---//
  /**
   * 注释是否统一位 JavaDoc 格式
   */
  JavadocComment = "JavadocComment",
  /**
   * 如果注释空, 则使用值内容作为注释(基本类型时生效)
   */
  ValueAsCommentIfAbsent = "ValueAsCommentIfAbsent",

  //--- json 2 json schema ---/
  /**
   * mock字段空时, 值作为候补(基本类型时生效)
   */
  ValueAsMock = "ValueAsMock",
}

export class Options {
  private options:Option[];

  constructor(options: Option[]) {
    this.options = options || [];
  }

  /**
   * 是否有指定的 Option
   * @param option Option
   */
  has(option: Option) {
    return this.options.indexOf(option) > -1;
  }

}
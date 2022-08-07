/**
 * 不重复注册 listener 回调;
 * 让发送事件和监听事件回调放在一起, 方便使用.
 */

import {IpcChannel} from "@/ipc/ipc_channel";

type IpcRendererEventListener = (...args: any[]) => void;


const LISTENERS = {
  [IpcChannel.getTplContent]: (args) => {
    console.log("收到渲染进程的消息", args);
    return "demo data";
  }
}



class IpcRenderWrap {
  send(ipcChannel: IpcChannel, listener: IpcRendererEventListener, ...args: any[]) {
    // 执行函数, 调用回调函数 listener
    const func = LISTENERS[ipcChannel];
    if (func != null) {
      const res = func(args);
      listener(res);
    }
  }
}

const ipcRenderWrap = new IpcRenderWrap();
export default ipcRenderWrap;
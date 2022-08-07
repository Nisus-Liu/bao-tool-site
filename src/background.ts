// 'use strict'
//
// import { app, protocol, BrowserWindow, ipcMain } from 'electron'
// import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
// import ipcMainHandler from "@/ipc/ipc_main_handle";
// import * as path from "path";
// const isDevelopment = process.env.NODE_ENV !== 'production'
//
// // Scheme must be registered before the app is ready
// protocol.registerSchemesAsPrivileged([
//   { scheme: 'app', privileges: { secure: true, standard: true } }
// ])
//
// async function createWindow() {
//   // Create the browser window.
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 900,
//     webPreferences: {
//
//       // Required for Spectron testing  false-则remote模块被禁用
//       enableRemoteModule: !!process.env.IS_TEST,
//
//       // Use pluginOptions.nodeIntegration, leave this alone
//       // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
//       // nodeIntegration: (process.env
//       //     .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
//       nodeIntegration: true,
//       contextIsolation: !(process.env
//           .ELECTRON_NODE_INTEGRATION as unknown) as boolean
//     },
//     // window
//     icon: path.join(__dirname, './assets/icon/icon.ico')
//   });
//   // if (process.platform === 'darwin') {
//   //   app.dock.setIcon(path.join(__dirname, './assets/icon/icon.icns'));
//   // }
//
//   if (process.env.WEBPACK_DEV_SERVER_URL) {
//     // Load the url of the dev server if in development mode
//     await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
//     if (!process.env.IS_TEST) win.webContents.openDevTools()
//   } else {
//     createProtocol('app')
//     // Load the index.html when not in development
//     win.loadURL('app://./index.html')
//   }
//
//   // 批量注册进 handler
//   ipcMainHandler.listen(win);
// }
//
// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })
//
// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) createWindow()
// })
//
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', async () => {
//   if (isDevelopment && !process.env.IS_TEST) {
//     // Install Vue Devtools
//     try {
//       await installExtension(VUEJS3_DEVTOOLS)
//     } catch (e) {
//       console.error('Vue Devtools failed to install:', e.toString())
//     }
//   }
//   createWindow()
// })
//
// // Exit cleanly on request from parent process in development mode.
// if (isDevelopment) {
//   if (process.platform === 'win32') {
//     process.on('message', (data) => {
//       if (data === 'graceful-exit') {
//         app.quit()
//       }
//     })
//   } else {
//     process.on('SIGTERM', () => {
//       app.quit()
//     })
//   }
// }
//
//
// const Store = require('electron-store');
// // 初始化(注释掉, 渲染进程依然可以正常使用? 另, 帖子说注释掉会造成渲染进程卡死? [Electron-store 渲染进程卡死原因](https://segmentfault.com/a/1190000040934859?sort=votes))
// Store.initRenderer();
//
// /*
// const store = new Store();
//
// store.set('unicorn', '🦄');
// console.log(store.get('unicorn'));
// //=> '🦄'
//
// // Use dot-notation to access nested properties
// store.set('foo.bar', true);
// console.log(store.get('foo'));
// //=> {bar: true}
//
// store.delete('unicorn');
// console.log(store.get('unicorn'));
// //=> undefined
// */

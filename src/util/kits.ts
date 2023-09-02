

export const capitalize = (str: string) => {
  if (str == null) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const nop = () => {
  // do nothing
}

/*
休眠函数sleep
调用 await sleep(1500)
 */
export function sleep(ms) {
  return new Promise(resolve=>setTimeout(resolve, ms))
}

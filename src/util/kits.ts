

export const capitalize = (str: string) => {
  if (str == null) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const nop = () => {
  // do nothing
}
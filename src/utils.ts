export const getId = (name: string) => {
  const buf = new Uint8Array(20 / 2);
  crypto.getRandomValues(buf);
  let ret = "";
  for (let i = 0; i < buf.length; ++i) {
    ret += ("0" + buf[i].toString(16)).slice(-2);
  }
  return `${name}__${ret}`;
};

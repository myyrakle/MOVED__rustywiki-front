export default {
  isServer(): boolean {
    return typeof window === 'undefined';
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getPageName(obj: any): string {
    const tmp = obj?.pageName;
    const pageName = Array.isArray(tmp) ? tmp[0] : tmp;
    return pageName;
  },

  getQueryItem(str: string | string[]): string {
    const item = Array.isArray(str) ? str[0] : str;
    return item;
  },
};

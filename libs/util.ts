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
};

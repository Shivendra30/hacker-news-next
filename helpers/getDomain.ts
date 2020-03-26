export default (url: string): string =>
  url
    ? '(' +
      url
        .replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .split('/')[0]
        .trim() +
      ')'
    : '';

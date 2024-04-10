import _slugify from 'slugify';

export const slugify = (string: string) =>
  _slugify(string, {
    lower: true,
    remove: /[^\w\s$*_+~().,'"!\-:@]+/g,
  });

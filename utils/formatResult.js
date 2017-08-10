/**
 * utils for formatting directive database result, such as remove underline '_id'
 * and such as
 */

const formatObject = (object) => {
  const targetObject = object;
  const filterObject = {};
  const withoutUndelineAttibute = Object.keys(targetObject).filter(key => !key.startsWith('_'));
  console.log(withoutUndelineAttibute);
  withoutUndelineAttibute.map((key) => {
    filterObject[key] = targetObject[key];
    return '';
  });
  return filterObject;
}

module.exports = {
  formatObject
};

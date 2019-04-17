export default function getSchema(schema, filterType) {
  if (Object(filterType) === filterType) {
    if (typeof filterType === 'function') {
      return schema.filter(filterType);
    } else {
      return schema.filter(item => {
        return Object.keys(filterType).every(k => filterType[k](item[k], item));
      });
    }
  } else if (filterType) {
    return schema.filter(item => item.showTypes.indexOf(filterType) > -1);
  } else {
    return schema.filter(item => !item.private);
  }
}

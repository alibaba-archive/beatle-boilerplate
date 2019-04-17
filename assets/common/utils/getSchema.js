export default function getSchema(schema, filterType) {
  if (Object(filterType) === filterType) {
    if (typeof filterType === 'function') {
      return schema.filter(filterType);
    } else {
      return schema.filter(item => {
        if (filterType[item.dataIndex]) {
          return filterType[item.dataIndex](item);
        } else {
          return !item.private;
        }
      });
    }
  } else if (filterType) {
    return schema.filter(item => item.showTypes.indexOf(filterType) > -1);
  } else {
    return schema.filter(item => !item.private);
  }
}

import urllib from 'url';

export default function getParams(queryStr, extra) {
  const query = Object(queryStr) === queryStr ? Object.assign({}, queryStr) : urllib.parse(queryStr, true).query;
  Object.assign(query, extra);
  return query;
}

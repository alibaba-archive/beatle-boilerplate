export default function getParams(query, extra) {
  return Object.assign({
    page: query.page,
    pageSize: query.pageSize
  }, extra);
}

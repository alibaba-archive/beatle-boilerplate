export default function getPagingParams(query, extra) {
  return Object.assign({
    page: query.page,
    pageSize: query.pageSize
  }, extra);
}

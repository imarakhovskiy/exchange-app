export default (paramsObj) =>
  Object.keys(paramsObj)
    .map((key) => key + '=' + paramsObj[key])
    .join('&')

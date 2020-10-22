function processResponse(response) {
  return new Promise((resolve, reject) => {
    let func
    response.status < 400 ? (func = resolve) : (func = reject)
    response.json().then((data) => func({ status: response.status, data: data }))
  })
}

const methodWrapper = (method) => (url, params) =>
  method(`${process.env.REACT_APP_API_URL}${url}`, {
    ...params,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(processResponse)

const get = methodWrapper((url, params) => fetch(url, { ...params, method: 'GET' }))

const post = methodWrapper((url, params) => fetch(url, { ...params, method: 'POST' }))

export default {
  get,
  post,
}

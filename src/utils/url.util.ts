export function parseQueryParams(url: string): any {
  return parseQueryString(url.substring(url.indexOf('?') + 1));
}

function parseQueryString(queryString: string) {
  const params: any = {};

  // Split into key/value pairs
  const queries = queryString.split('&');

  // Convert the array of strings into an object
  for (let i = 0, l = queries.length; i < l; i++) {
    const temp = queries[i].split('=');
    params[temp[0]] = temp[1];
  }

  return params;
}

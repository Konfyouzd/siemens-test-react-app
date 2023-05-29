const fetch = (request) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open(request.method, request.path);

  if (request.headers) {
    Object.keys(request.headers).forEach((header) => xhr.setRequestHeader(header, request.headers[header]));
  }

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      if (xhr.status === 204) {
        resolve(null);
      } else {
        const { response } = xhr;
        resolve(response ? JSON.parse(response) : response);
      }
    } else {
      reject(new Error(xhr));
    }
  };

  xhr.onprogress = (event) => {
    /* eslint-disable no-console */
    if (event.lengthComputable) {
      console.log(`Received ${event.loaded} of ${event.total} bytes`);
    } else {
      console.log(`Received ${event.loaded} bytes`);
    }
    /* eslint-enable no-console */
  };

  xhr.onerror = () => reject(new Error('Request failed'));

  xhr.send();
});

export default fetch;

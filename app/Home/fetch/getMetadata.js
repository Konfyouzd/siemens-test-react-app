import fetch from 'common/functions/fetch';

const getMetadata = () => {
  const params = {
    method: 'GET',
    path: '/api/metadata',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  return fetch(params);
};

export default getMetadata;

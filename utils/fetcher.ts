export const fetcher = async (...args: [RequestInfo, RequestInit?]) => {
  return fetch(...args).then(res => {
    return res.json();
  });
};

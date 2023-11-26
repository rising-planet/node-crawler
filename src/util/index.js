import axios from "axios";

export const sleep = (sleepTime = 1) => {
  return new Promise((resolve) => {
    setTimeout(resolve, sleepTime);
  });
};

export const getEventDetail = async (eventUrl) => {
  // keys :  [ 'status', 'statusText', 'headers', 'config', 'request', 'data' ]
  const { data, status } = await axios.get(eventUrl);
  if (status !== 200) throw new Error(`http get status code : ${status}`);
  if (!data) throw new Error("http get data is null");
  return data;
};

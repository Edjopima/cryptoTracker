import React, {useState,useEffect} from 'react';

const useGetRequest = (url) => {
  const [data,setData] = useState(false);

  useEffect(async () => {
    const res = await fetch(url);
    const resJson = await res.json();
    setData(resJson);
  },[url])
  
  return data;
}

export default useGetRequest;
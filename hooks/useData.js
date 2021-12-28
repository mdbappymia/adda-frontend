import {useEffect, useState} from 'react';

const useData = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://192.168.43.64:5000/posts')
      .then(res => res.json())
      .then(data => setPosts(data.reverse()));
  }, []);

  return {posts, setPosts};
};

export default useData;

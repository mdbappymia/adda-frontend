import {useEffect, useState} from 'react';

const useData = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const renderPost = posts.filter(post =>
    post.postText.toLowerCase().includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    fetch('http://192.168.43.64:5000/posts')
      .then(res => res.json())
      .then(data => setPosts(data.reverse()));
  }, []);

  return {posts, setPosts, setSearchText, renderPost};
};

export default useData;

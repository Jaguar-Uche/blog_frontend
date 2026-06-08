import React from 'react'
import Post from '../Post'
import { useEffect } from 'react'
import { useState } from 'react'

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    fetch('https://blog-4jyg.onrender.com/posts').then(response => {
      //replace url with backend url 
      response.json().then(posts => {
        setPosts(posts);
      })
    })
  },[])
  return (
    <>
    {posts.length >0 ? posts.map(post => (
      <Post key={post._id} {...post} />
    )) :(<div> No Posts Yet. Please Create new Posts</div>) }
    </>
  )
}

export default HomePage
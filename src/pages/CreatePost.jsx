import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev){
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files?.[0]);
    ev.preventDefault();
    const response = await fetch('https://blog-4jyg.onrender.com/post', {
      //replace url with backend url 
      method:'POST',
      body:data,
      credentials:'include',
    })
    if(response.ok){
      setRedirect(true);
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <>
    <form action="" onSubmit={createNewPost}>
      
      <input 
      type='title' 
      placeholder='Title' 
      value={title} 
      onChange={(e)=>setTitle(e.target.value)} />

      <input 
      type="summary" 
      placeholder='Summary' 
      value={summary} 
      onChange={(e)=>setSummary(e.target.value)} />

      <input type="file" onChange={ev=>{setFiles(ev.target.files)}} />

      <ReactQuill 
      value={content} 
      modules={modules} 
      formats={formats} 
      onChange={setContent}/>

      <button className='button' style={{marginTop:'5px'}}>Post</button>
    </form>
    </>
  )
}

export default CreatePost
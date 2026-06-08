import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';


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

const EditPost = () => {

  const {id} = useParams();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [cover, setCover] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
    fetch('http://localhost:4000/posts/'+id)
    .then(response => {response.json().then(postInfo => {
      //replace url with backend url 
      setTitle(postInfo.title);
      setContent(postInfo.content);
      setSummary(postInfo.summary);
    }
    )})
  },[])

  async function updatePost(ev){
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if(files?.[0]){
      data.set('file', files?.[0]);
    }
    const response = await fetch('https://blog-4jyg.onrender.com/posts', {
      //replace url with backend url 
      method:'PUT',
      body:data,
      credentials:'include',
    })

    if(response.ok){
      setRedirect(true);
    }
  }

  if(redirect){
    return <Navigate to={'/posts/'+id}/>
  }
  return (
    <>
    <form action="" onSubmit={updatePost}>
      
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

      <button className='button' style={{marginTop:'5px'}}>Update</button>
    </form>
    </>
  )
}

export default EditPost
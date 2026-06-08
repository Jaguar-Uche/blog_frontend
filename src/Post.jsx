import React from 'react'
import {formatISO9075} from 'date-fns';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({_id,title, summary, cover,content,createdAt,author}) => {

  return (
    <div className="post">
          <div className="image">
            <Link to={`/posts/${_id}`} >
              <img src={'https://blog-4jyg.onrender.com/'+cover} alt="Lawn Mower" />
              {/* replace url with backend url  */}
            </Link>
          </div>
          <div className="text">
            <Link to={`/posts/${_id}`}>
              <h2>{title}</h2>
            </Link>
            <p className='info'>
              <a className="author">{author.username}</a>
              <time dateTime="">{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
            </p>
            <p className='summary'>{summary}</p>
          </div>
        </div>
  )
}

export default Post
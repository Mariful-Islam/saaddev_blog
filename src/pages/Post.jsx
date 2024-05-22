import React, {useState} from 'react'
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from 'react-router-dom';


const Post = () => {

    let navigate = useNavigate()
    let username = localStorage.getItem('username')

    let [content, setContent] = useState('')

    let [postRes, setPostRes] = useState('') 

    let postHandle = async (e) => {
        e.preventDefault()
        localStorage.setItem('username', e.target.username.value);
        e.preventDefault()
        let response = await fetch('https://saaddev.pythonanywhere.com/blog/create_post/', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({'user': username? username : e.target.username.value,
                    'title': e.target.title.value,
                    'content': content,
                    'tag': e.target.tag.value})
            })
        let data = await response.json()
        setPostRes(data)
        
        navigate('/')

    }

 
    
    return (
        <div className='wrapper post'>
            {postRes ?
                <div className='response'>{postRes}</div>
                :
                <form method='POST' onSubmit={postHandle}>
                    { username.length === 0 ?
                        <input type='text' name='username' placeholder='username' />:
                        <input type='text' name='username' value={username} placeholder='username' style={{display:'none'}}/>
                    } <br/>
                    <input type='text' name='title' placeholder='title'/>
                    <CKEditor editor={ClassicEditor}
                              onChange={(event, editor) => setContent(editor.getData())}
                              
                              
                    /> <br/>
                    <input type='text' name='tag' placeholder='Tag, write separated with comma'/><br/>
                    <button type='submit' className='fill_btn' style={{height:40, width:130}}>Post</button>
                </form>
            }
        </div>
  )
}

export default Post
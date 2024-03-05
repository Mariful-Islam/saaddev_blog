import React, {useState} from 'react'
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const Post = () => {

    let [content, setContent] = useState('')

    let [postRes, setPostRes] = useState('')
    let postHandle = async (e) => {
        e.preventDefault()
        let response = await fetch('/blog/create_post/', {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'user': e.target.username.value,
                'title': e.target.title.value,
                'content': content,
                'tag': e.target.tag.value})
        })
        let data = await response.json()
        setPostRes(data)
    }



    return (
        <div className='wrapper post'>
            {postRes ?
                <div className='response'>{postRes}</div>
                :
                <form method='POST' onSubmit={(e) => postHandle(e)}>
                    <input type='text' name='username' placeholder='username'/> <br/>
                    <input type='text' name='title' placeholder='title'/>
                    <CKEditor editor={ClassicEditor}
                              onChange={(event, editor) => setContent(editor.getData())}
                    /> <br/>
                    <input type='text' name='tag' placeholder='Tag, write separated with comma'/><br/>
                    <input type='submit' value='Post'/>
                </form>
            }
        </div>
  )
}

export default Post
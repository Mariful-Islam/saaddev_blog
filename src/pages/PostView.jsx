import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import PostsContext from "../context/PostContext";


const PostView = () => {
  let {id} = useParams()
    let navigate = useNavigate()
    let username = localStorage.getItem('username')



  let [postView, setPostView] = useState([])
    let getPostView = async () => {
        let response = await fetch(`https://saaddev.pythonanywhere.com/blog/post/${id}/`)
        let data = await response.json()
        setPostView(data)
    }
    useEffect(()=>{
      getPostView()
    }, [])

    function content() {
        return {__html: postView.content};
    }


    let {getPosts, posts} = useContext(PostsContext)
    let [res, setRes] = useState('')

    let onDelete = async (id) => {
        let response = await fetch(`https://saaddev.pythonanywhere.com/blog/post_delete/${id}/`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        let data = await response.json()
        setRes(data)
        getPosts()
        navigate('/')
    }

    let [comments, setComments] = useState([])
    let getComments = async () => {
        let response = await fetch(`https://saaddev.pythonanywhere.com/blog/comment/${id}/`)
        let data = await response.json()
        setComments(data)
        console.log(data)
    }

    useEffect(()=>{
        getComments()
    }, [])

    let [createComment, setCreateComment] = useState('')
    let createCommentHandle = async (e) => {
      if(username){
          let response = await fetch(`https://saaddev.pythonanywhere.com/blog/post_comment/`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({'post_id': id, 'user': username, 'text': e.target.text.value})
          })
          let data = await response.json()
          setCreateComment(data)
          getComments()
      }else {
          let response = await fetch(`https://saaddev.pythonanywhere.com/blog/post_comment/`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({'post_id': id, 'user': e.target.user.value, 'text': e.target.text.value})
          })
          let data = await response.json()
          setCreateComment(data)
          getComments()
      }
    }

    let [dltRes, setDltRes] = useState('')

    let deleteHandle = async (id) => {
        let response = await fetch(`https://saaddev.pythonanywhere.com/blog/delete_comment/${id}/`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        let data = await response.json()
        setDltRes(data)
        getComments()
    }



  return (
        <div className='wrapper' style={{marginBottom: 100}}>
            <div className='post_view'>
                <div className='post'>
                    <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", gap:50}}>
                        <strong style={{fontSize:'0.8rem'}}>@{postView.user}</strong><br/>
                        <svg className="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24"
                             stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"/>
                            <path d="M13.5 6.5l4 4"/>
                        </svg>
                        <div onClick={()=>onDelete()}>
                            <svg className="icon icon-tabler icon-tabler-trash-filled" width="24"
                                 height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"
                                    stroke-width="0" fill="currentColor"/>
                                <path
                                    d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                                    stroke-width="0" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>

                    <h2>{postView.title}</h2>
                    <p>
                       <div dangerouslySetInnerHTML={content()} />
                    </p>

                    <div className='tag_list'>
                        {/*{postView.tag.map((tag)=>(*/}
                        {/*    <p className='tag'>{tag}</p>*/}
                        {/*))}*/}
                        {postView.tag_list}
                    </div>
                </div>
            </div>
            <div className='comment_list'>
                {comments.map((comment)=>(
                     <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}>
                        <div className='comment'>
                            <strong style={{fontSize:'0.8rem'}}>@{comment.user}</strong>
                            <p>{comment.text}</p>
                        </div>
                        <div style={{display:"flex", gap: 20}}>
                            <svg className="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24"
                                         stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"/>
                                        <path d="M13.5 6.5l4 4"/>
                            </svg>
                            <svg onClick={()=>deleteHandle(comment.id)} className="icon icon-tabler icon-tabler-trash-filled" width="20"
                                     height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                     stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path
                                        d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"
                                        stroke-width="0" fill="currentColor"/>
                                    <path
                                        d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                                        stroke-width="0" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                ))}
                {createComment}
                 <form onSubmit={(e)=>createCommentHandle(e)}>

                     <input type='text' name='user' value={username ? username : <></>} placeholder='name'/>

                    <textarea name='text' placeholder='Write Comment'/>
                    <input type='submit' value='Comment'/>
                 </form>

            </div>

        </div>
  )
}

export default PostView
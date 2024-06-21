import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import PostsContext from "../context/PostContext";


const PostView = () => {
  let {id} = useParams()
    let navigate = useNavigate()
    let username = localStorage.getItem('username')



  let [postView, setPostView] = useState("")
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

    let onDelete = async (e) => {
        e.preventDefault()
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
        e.preventDefault()
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
        e.target.reset()
    }

    let [dltRes, setDltRes] = useState('')

    let deleteHandle = async (e, id) => {
        e.preventDefault()
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


    let tag = postView.tag_list
    console.log(tag)


  return (
        <div className='wrapper' style={{marginBottom: 100}}>
            <div className='post_view'>
                <div className='post'>
                    <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", gap:50}}>
                        <strong style={{fontSize:'0.8rem', cursor: 'default'}} onClick={()=>navigate(`/profile/${postView.user}`)} >@{postView.user}</strong><br/>
                        { username === postView?.user ? 
                            <>
                                <svg className="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24"
                                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"/>
                                    <path d="M13.5 6.5l4 4"/>
                                </svg>
                            
                                <svg onClick={onDelete} className="icon icon-tabler icon-tabler-trash-filled" width="24"
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
                            </>
                            :
                            <></>
                        }
                
                    </div>

                    <h2>{postView?.title}</h2>
                    <p>
                       <div dangerouslySetInnerHTML={content()} />
                    </p>

                    <div className='tag_list'>
                       
                    </div>
                </div>
            </div>
            <div className='comment_list'>
                {comments?.map((comment)=>(
                     <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}>
                        <div className='comment'>
                            <strong style={{fontSize:'0.8rem'}} onClick={(e)=>navigate(`/profile/${comment?.user}`)}>@{comment.user}</strong>
                            <p>{comment?.text}</p>
                        </div>
                        { username === comment?.user ?
                        <div style={{display:"flex", gap: 20}}>
                            <svg className="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24"
                                         stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"/>
                                        <path d="M13.5 6.5l4 4"/>
                            </svg>
                            <svg onClick={(e)=>deleteHandle(e, comment.id)} className="icon icon-tabler icon-tabler-trash-filled" width="20"
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
                        </div> :
                        <></>}
                    </div>
                ))}
                {createComment}
                 <form onSubmit={(e)=>createCommentHandle(e)}>
                    { username.length === 0 ?
                        <input type='text' name='user' placeholder='name'/>:
                        <input type='text' name='user' value={username} placeholder='name' style={{display:'none'}}/>
                    }

                    <textarea name='text' placeholder='Write Comment'/>
                    <input type='submit' value='Comment'/>
                 </form>

            </div>

        </div>
  )
}

export default PostView
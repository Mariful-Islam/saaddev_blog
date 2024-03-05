import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import PostsContext from "../context/PostContext";


const PostView = () => {
  let {id} = useParams()
    let navigate = useNavigate()



  let [post, setPost] = useState("")
    let getPost = async () => {
        let response = await fetch(`/blog/post/${id}/`)
        let data = await response.json()
        setPost(data)
    }
    useEffect(()=>{
      getPost()
    }, [])

    function content() {
        return {__html: post.content};
    }


    let {getPosts, posts} = useContext(PostsContext)
    let [res, setRes] = useState('')

    let onDelete = async (id) => {
        let response = await fetch(`/blog/post_delete/${id}/`, {
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


  return (
        <div className='wrapper'>
            <div className='post'>
                <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", gap:50}}>
                    <strong style={{fontSize:'0.8rem'}}>@{post.user}</strong><br/>
                    <svg className="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24"
                         stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"/>
                        <path d="M13.5 6.5l4 4"/>
                    </svg>
                    <div onClick={()=>onDelete(id)}>
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

                <h2>{post.title}</h2>
                <p>
                   <div dangerouslySetInnerHTML={content()} />
                </p>

                <div className='tag_list'>
                    {/*{tag.map((t)=>(*/}
                    {/*    <p className='tag'>{t}</p>*/}
                    {/*))}*/}
                </div>
            </div>

        </div>
  )
}

export default PostView
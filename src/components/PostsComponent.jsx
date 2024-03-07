import React, {useContext, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import PostsContext from "../context/PostContext";


const PostsComponent = ({post}) => {
    const navigate = useNavigate()

    let {getPosts, posts} = useContext(PostsContext)



    function desc() {
          return {__html: post.content.slice(0, 30)};
    }

    let tag = post.tag.split(',')

    let [postRes, setPostRes] = useState('')

    let deleteHandle = async () => {
        let response = await fetch(`https://saaddev.pythonanywhere.com/blog/post_delete/${post.id}/`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        let data = await response.json()
        setPostRes(data)
        getPosts()
    }

    return(
        <div className='post_component' >
            <div className='post'>
                <strong style={{fontSize:'0.8rem'}}><Link to={`/profile/${post.user}`}>@{post.user}</Link></strong><br/>
                <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
                <p>
                   <div dangerouslySetInnerHTML={desc()} />
                </p>

                <div className='tag_list'>
                    {tag.map((t)=>(
                        <p className='tag'>{t}</p>
                    ))}
                </div>
            </div>
            <div>

                <svg onClick={()=>deleteHandle()} className="icon icon-tabler icon-tabler-trash-filled" width="24"
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
    )
}

export default PostsComponent
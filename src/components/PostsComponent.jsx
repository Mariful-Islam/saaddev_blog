import React, {useContext, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import PostsContext from "../context/PostContext";
import { TimeFormat } from "./Tools";

const PostsComponent = ({post, getPosts}) => {
    const navigate = useNavigate()

    let {posts} = useContext(PostsContext)

    let username = localStorage.getItem('username')



    function desc() {
          return {__html: post.content.slice(0, 30)};
    }

    let tag = post.tag.split(',')

    let [postRes, setPostRes] = useState('')

    let deleteHandle = async (e) => {
        e.preventDefault()
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
            <div className='post_content'>
                
                <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
                <div>
                    <Link to={`/profile/${post.user}`} style={{fontSize:'0.8rem'}}>@{post.user}</Link><br/>
                    <p>{TimeFormat(post.updated)}</p>
                </div>
                <div className='tag_list'>
                    {tag.map((t)=>(
                        <p className='tag'>{t}</p>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default PostsComponent
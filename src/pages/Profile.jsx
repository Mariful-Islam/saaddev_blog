import React, {useEffect, useState} from "react";
import {useNavigate, Link, useParams} from "react-router-dom"
import PostsComponent from "../components/PostsComponent";
import user from '../assets/images/user.jpg'
import history from '../assets/images/history.png'


let Profile = () => {
    let {username} = useParams()
    let [settedUsername, setSettedUsername] = useState("")
    // let username = localStorage.getItem('username')

    const navigate = useNavigate()
    let [userPosts, setUserPosts] = useState([])
    let getUserPosts= async () => {
        let response = await fetch(`https://saaddev.pythonanywhere.com/blog/user_post/${username}/`)
        let data = await response.json()
        setUserPosts(data)
    }
    useEffect(()=>{
      getUserPosts()
    }, [])


    let [comments, setComments] = useState([])
    let getComments = async () => {
        let response = await fetch(`https://saaddev.pythonanywhere.com/blog/user_comment/${username}/`)
        let data = await response.json()
        setComments(data)
        console.log(data)
    }

    useEffect(()=>{
        getComments()
    }, [])



    useEffect(()=>{
        getUsername()
    }, [settedUsername])

    let getUsername = () => {
        setSettedUsername(localStorage.getItem('username'))
    }

    let setUsername = (e) => {
        e.preventDefault()
        localStorage.setItem('username', e.target.username.value)
        getUsername()
        getUserPosts()
        getComments()
    }

    return (
        <div className='wrapper profile'>
            <div className="user_details">
                <img src={user} alt=""/>
                <h1>{username}</h1>
                <div className="follow">
                    <div><strong>Followers:345546</strong></div>
                    <div><strong>Following:564414</strong></div>
                </div>
            </div>
            <div className="action">
                <p className="outline_btn">View As</p>
                <p className="fill_btn">Edit Profile</p>
            </div>
       
            <div className="post_history">
                <h2><img src={history} alt=""/>Your Posts</h2>
                <div className="posts">
                    {userPosts.map((post)=>(
                        <PostsComponent post={post}/>
                    ))}
                </div>
            </div>
            <div className="activity">
                <h2><img src={history} alt=""/>Your Activity</h2>
                <div>
                    {comments.map((comment)=>(
                        <p>You commented <strong>{comment.text}</strong> on <Link to={`/post/${comment.post_id}`}>{comment.post_title}</Link></p>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default Profile
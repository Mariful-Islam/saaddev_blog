import React, {useEffect, useState} from "react";
import {useNavigate, Link, useParams} from "react-router-dom"
import PostsComponent from "../components/PostsComponent";


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
            <strong>
                { !settedUsername ?
                    <form onSubmit={(e)=>setUsername(e)}>
                        <input type='text' name='username' placeholder='username'/> <br />
                        <input type='submit' value='Submit'/>
                    </form> 
                    :
                    username
                }
            </strong>
            <h2>Your Posts</h2>
            {userPosts.map((post)=>(
                <PostsComponent post={post}/>
            ))}
            <h2>Your Activity</h2>
            <div>
                {comments.map((comment)=>(
                    <p>You commented <strong>{comment.text}</strong> on <Link to={`/post/${comment.post_id}`}>{comment.post_title}</Link></p>
                ))}

            </div>

        </div>
    )
}

export default Profile
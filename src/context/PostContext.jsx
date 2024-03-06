import React, {createContext, useEffect, useState} from "react";

const PostsContext = createContext()
export default PostsContext


export const PostsProvider = ({children}) => {
    let [posts, setPosts] = useState([])
    let getPosts = async () => {
        let response = await fetch('https://saaddev.pythonanywhere.com/blog/posts/')
        let data = await response.json()
        setPosts(data)
    }

    useEffect(()=>{
        getPosts()
    },[])

   let data = {
       getPosts: getPosts,
       posts: posts
    }

    return (
        <PostsContext.Provider value={data}>
            {children}
        </PostsContext.Provider>

    )
}
import React, {useEffect, useState, useContext} from 'react'
import {Link} from "react-router-dom";
import PostsComponent from "../components/PostsComponent";
import PostsContext from "../context/PostContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Front from '../components/Front';
import Idea from '../components/Idea';


const Home = () => {

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
            setPage(value);
          };

    let [posts, setPosts] = useState([])
    let [count, setCount] = useState(0)
    let getPosts = async () => {
        let response = await fetch(`https://saaddev.pythonanywhere.com/blog/posts/`)
        let data = await response.json()
        setPosts(data)
        setCount(data.length)
    }

    useEffect(()=>{
        getPosts()
    },[page])

    console.log(posts)


    let [search, setSearch] = useState("")
    let searchFilter = posts.filter((post)=>post.user.toLowerCase().includes(search.toLowerCase()) ||
    post.title.toLowerCase().includes(search.toLowerCase()) || post.content.toLowerCase().includes(search.toLowerCase()) || post.tag.toLowerCase().includes(search.toLowerCase())
    )



  return (
    <div className='home'>
        <div className='search wrapper'>
            <form>
                <input type='text' name='search' onChange={(e)=>setSearch(e.target.value)} placeholder='Search'/>
            </form>
            <div>
                {
                    search.length === 0 ?<></>:
           
                        searchFilter.length === 0 ?
                            <strong style={{display:"flex", justifyContent:"center"}}>Not Found</strong> 
                            :
                        searchFilter.map((post, index)=>(
                            <div style={{position: 'absolute', height:400, overflowY: 'auto'}}>
                                <PostsComponent post={post} key={index} getPosts={getPosts}/>
                            </div>
                            ))

                }
            </div>
        </div>
        <div>
            <Front/>
        </div>
        
        <div>
            { search.length === 0 ?
                <strong>Total: {count}</strong> :
                <strong>Total: {searchFilter.length}</strong>
            }
        </div>

        <div className='posts wrapper'>
          {
                  posts.map((post, index)=>(
            <PostsComponent post={post} key={index} getPosts={getPosts}/>
                  ))
          }


        </div>
        <div>
            <Idea/>
        </div>


    </div>
  )
}

export default Home
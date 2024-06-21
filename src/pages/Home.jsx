import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import PostsComponent from "../components/PostsComponent";
import PostsContext from "../context/PostContext";
import Front from '../components/Front';
import Idea from '../components/Idea';


const Home = () => {

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const { getPosts, posts } = useContext(PostsContext)

    useEffect(() => {
        getPosts()
    }, [page])

    let [search, setSearch] = useState("")
    let searchFilter = posts.filter((post) => post.user.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase()) || post.content.toLowerCase().includes(search.toLowerCase()) || post.tag.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='home'>
            <div className='search wrapper'>
                <form>
                    <input type='text' name='search' onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
                </form>

                {
                    search?.length === 0 ? <></> :
                        <div className='search_post' >

                            {searchFilter?.length === 0 ?
                                <strong style={{ display: "flex", justifyContent: "center" }}>Not Found</strong>
                                :
                                searchFilter?.map((post, index) => (
                                    <div>
                                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                                    </div>
                                ))}
                        </div>

                }

            </div>
            <div>
                <Front />
            </div>

            <div className='wrapper'>
                <strong>Total: {posts?.length}</strong>
            </div>

            <div className='posts wrapper'>
                {
                    posts?.map((post, index) => (
                        <PostsComponent post={post} key={index} getPosts={getPosts} />
                    ))
                }


            </div>
            <div>
                <Idea />
            </div>


        </div>
    )
}

export default Home
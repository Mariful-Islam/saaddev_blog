import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import PostsContext from "../context/PostContext"
import PostsComponent from "../components/PostsComponent"


const SearchPage = () => {
    const { keyword } = useParams()

    const { getPosts, posts } = useContext(PostsContext)

    let searchFilter = posts.filter((post) => post.user.toLowerCase().includes(keyword.toLowerCase()) ||
        post.title.toLowerCase().includes(keyword.toLowerCase()) || post.content.toLowerCase().includes(keyword.toLowerCase()) || post.tag.toLowerCase().includes(keyword.toLowerCase())
    )

    return (
        <div className="wrapper">
            {searchFilter?.map((post, index) => (
                <PostsComponent post={post} key={index} getPosts={getPosts} />
            ))}
        </div>
    )

}

export default SearchPage
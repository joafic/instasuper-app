import axios from 'axios'

const getPosts = async () => {
    const resp = await axios.get('http://localhost:3001/posts')
    return resp.data;

}
const getComments = async () => {
    const resp = await axios.get('http://localhost:3001/comments')
    return resp.data;

}
const getLikes = async () => {
    const resp = await axios.get('http://localhost:3001/likes')
    return resp.data;
}

const getPostImage  = async (url) => {
    console.log(url)
    const resp = await axios.get(url)
    return resp.data;
}

const getAllData = async () =>{
    const likes = await axios.get('http://localhost:3001/likes')
    const comments = await axios.get('http://localhost:3001/comments')
    const posts = await axios.get('http://localhost:3001/posts')
    
    posts.data.map((post)=>{
        post.likes = []
        post.comments = []

        likes.data.map((like, index)=>{
            if (like.postId == post.id) {
                post.likes[index] = like
            }
        })

        comments.data.map((comment,index)=>{
            if (comment.postId == post.id) {
                post.comments[index] = comment
            }
        })
    });
    return posts;

}

export {
    getPosts,
    getComments,
    getLikes,
    getPostImage,
    getAllData
}
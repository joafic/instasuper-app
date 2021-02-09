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

export {
    getPosts,
    getComments,
    getLikes
}
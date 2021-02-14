<template>
    
  <div class="p-col-8 p-offset-2 container">
    <div style="text-align:center"><ProgressSpinner v-if="isLoading"/></div> 
    <div class="p-gird p-offset-1">
      <h1>Instasuper #1</h1>
    </div>
    <div class="p-col-12">
      <h1>{{isLoading}}</h1>
      <div class="p-grid nested-grid">
        <div class="p-col-4">
          <div class="p-col-12 p-mt-3">
            <div v-if="!isLoading" class="p-grid">
              <div class="profile-picture">
                <img :src="require(`@/assets/${currentUser.user}.png`)">
              </div>
              <div class="p-col-7">
                <div><b>{{currentUser.user}}</b></div>
                <div class="p-d-flex p-flex-column status">
                  <span class="p-mb-1"><b>{{currentUser.totalPosts}} </b> posts</span>
                  <span class="p-mb-1"><b>{{currentUser.totalLikes}} </b> curtidas</span>
                  <span><b>{{currentUser.totalComments}}</b> comentários</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-col-7">
          <div class="p-grid">
            <div class="p-col-12 p-d-flex p-jc-center">
              <b> Visualizar como:</b>
            </div>
            <div class="p-col-12">
              <div class="p-grid">
                <div class="p-mt-2 p-col-4 users " :class="[currentUser.user == 'superman'? {selectedProfile:'selectedProfile'} : '']" @click="changeProfile('superman')">
                  <img src="@/assets/superman.png" class="i" />
                  <span>Superman</span>
                </div>
                <div class="p-mt-2 p-col-4 users " :class="[currentUser.user == 'batman'? {selectedProfile:'selectedProfile'} : '']" @click="changeProfile('batman')">
                  <img src="@/assets/batman.png" class="i" />
                  <span>Batman</span>
                </div>
                <div class="p-mt-2 p-col-4 users" :class="[currentUser.user == 'aquaman'? {selectedProfile:'selectedProfile'} : '']" @click="changeProfile('aquaman')">
                  <img src="@/assets/aquaman.png" class="i" />
                  <span>Aquaman</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<posts v-if="isLoading == false" :currentUser="currentUser" :isLoading="isLoading"></posts>-->
    
    <div v-for="(post,index) in posts" :key="index" class="p-grid" style="border:1px solid red">
      <div class="p-col-4 post-img" style="border:1px solid black">

        <img v-if="post.picture && typeof post.picture ==='string'" :src="post.picture">
      </div>
      <div class="p-col-8" style="border:1px solid black">
          <div class="p-col-12" style="border:1px solid black">
            <div class="p-grid">
              <div class="p-md-2">
                <div class="profile-picture post">
                  <img :src="require(`@/assets/${currentUser.user}.png`)">
                </div>
              </div>
             
              <div class="p-col-10 ">
                <div class="p-grid">
                  <div class="p-col-4 p-md-4"><b>{{currentUser.user}}</b></div>
                  <div class="p-col-8">{{post.comments[0].comment}}</div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="p-d-flex p-flex-row icons">
                  <b> <i class="pi pi-heart"></i> {{post.likes.length}}</b>
                  <b><i class="pi pi-book"></i> {{post.comments.length}} </b>
                </div>
              </div>
              
            </div>
            </div>
          <div v-for="(comment,index) in post.comments" :key="index" class="p-col-12" style="border:1px solid black"><b>{{comment.user}}</b> {{comment.comment}}</div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { onMounted, ref, watch, } from 'vue';
import { getAllData} from './services/superhero-service.js'
//import Posts from './components/posts.vue';
export default {
  name: "App",
  //components:{ Posts },

  setup(){
    const currentUser = ref({user:'superman',posts:[], comments:[], likes:[]})
    const posts = ref(null);
    const comments = ref(null);
    const likes = ref(null);
    const isLoading = ref(true)
    
    const changeProfile = (user) => {
      isLoading.value = true;
      currentUser.value.user = user
      currentUser.value.comments = []
      currentUser.value.likes = []
      currentUser.value.posts = []

      getUserLikes(user)
      getUserComments(user)
      getUserPosts(user)
      
      isLoading.value = false;

    }

    watch(currentUser.value,function(newValue){
      console.log(newValue)
    });

    const getComment = (postId) => {
      
       currentUser.value.comments.map((comment)=>{
      if (comment.postId === postId){
        console.log(comment.postId + ' : ' + postId) 
      }
      return
      })
  
    }

    getAllData().then((res)=>{
      isLoading.value = true;

      likes.value = res.likes.data
      comments.value = res.comments.data
      posts.value = res.posts.data

      posts.value.forEach(post => {
        post.comments = [
          ...comments.value.filter((comment) => comment.postId == post.id)
        ];
        post.likes = [...likes.value.filter((like) =>like.postId == post.id)]
        
      });
      getUserLikes('superman')
      getUserComments('superman')
      getUserPosts('superman')
      
      }).finally(()=>{
        isLoading.value = false
        console.log(posts.value)
    });

    const getUserPosts = (user) => {
      posts.value.map((p,index)=>{
         if (p.user == user) { 
           currentUser.value.posts[index] = p; 
           }
          });
         
        currentUser.value.totalPosts = currentUser.value.posts.length
    }
    const getUserComments = (user) => {
      comments.value.map((c,index)=>{
        if (c.user == user) { currentUser.value.comments[index] = c; }
            });
        currentUser.value.totalComments = currentUser.value.comments.length
    }

    const getUserLikes = (user) => {
      likes.value.map((l,index)=>{
        if (l.user == user) { currentUser.value.likes[index] = l; }
            });
        currentUser.value.totalLikes = currentUser.value.likes.length
    }

   
   /** getPosts().then(resp => {
      isLoading.value = true
      posts.value = resp 
      })
      .finally(()=>{
        getUserPosts('superman')
        isLoading.value = false
        });

    getLikes().then((resp)=>{
       isLoading.value = true
       likes.value = resp
       })
       .finally(()=>{ 
          getUserLikes('superman')
          isLoading.value = false 
          });
    
    getComments().then(resp=>{
      isLoading.value = true
      comments.value = resp
      })
      .finally(()=>{ 
        getUserComments('superman')
        isLoading.value = false 
        });
    */
    onMounted(()=>{
      //console.log(posts.value)
      //getPosts()
      //getLikes()
      //getComments()
      
    })

    return { changeProfile,currentUser,isLoading,posts,getComment}
  }
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.profile-picture {
  display: flex;
  flex-direction: row;
  width: 5em;
  height: 5em;
  overflow: hidden;
  border-radius: 50%;
}

.profile-picture img {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
}
.post{
  width: 4em;
  height: 4em;
  margin: .2em 0 0 .2em;
}

.post-img{
  display: flex;
  flex-direction: column;
  height: 20em;
  overflow: hidden;
  
}
.post-img img{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: auto;
  margin: 0;
}
.status {
  font-size: 0.85em;
  font-weight: 500;
  color: rgb(116, 116, 117);
}
.status b {
  color: black;
}

.icons b{
  margin: .3em;
}
.i {
  border-radius: 50%;
  height: 100%;
  width: 35%;
}
.users {
  /**border:1px solid rgb(39, 39, 39);*/
  cursor: pointer;
  width: 4em;
  height: 4em;
}
.users:hover ,.selectedProfile{
  background-color: rgba(0, 0, 0, 0.123);
}
.users span {
  font-size: 0.9em;
  margin-left: 0.3em;
}
.container {
  border: 1px solid lightgray;
  background-color: hsla(0, 0%, 95%, 0.424);
}
</style>

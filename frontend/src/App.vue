<template>
  <div class="p-col-8 p-offset-2 container">
    <div class="p-gird p-offset-1">
      <h1>Instasuper #1</h1>
    </div>
    <div class="p-col-12">
      <h1>{{isLoading}}</h1>
      <div class="p-grid nested-grid">
        <div class="p-col-4" style="border-color: red">
          <div class="p-col-12 p-mt-3">
            <div v-if="!isLoading" class="p-grid" style="border-color: blue">
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
    
    <div class="p-grid" style="border:1px solid red">
      <div class="p-col-4 post-img" style="border:1px solid black">

        <img src="https://image.tmdb.org/t/p/w500/oB367uFcyU2uhGkFqo5RB4Evdji.jpg">
      </div>
      <div class="p-col-8" style="border:1px solid black">
          <div class="p-col-12" style="border:1px solid black">6</div>
          <div class="p-col-12" style="border:1px solid black">6</div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { onMounted, ref, watch, } from 'vue';
import {getComments, getLikes, getPosts} from './services/superhero-service.js'
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

      getUserPosts(user)
      getUserLikes(user)
      getUserComments(user)
      
      isLoading.value = false;

    }

    watch(currentUser.value,function(newValue){
      console.log(newValue)
    });
    
    const getUserPosts = (user) => {
      posts.value.map((p,index)=>{
         if (p.user == user) { currentUser.value.posts[index] = p; }
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

    getPosts().then(resp => {
      isLoading.value = true
      posts.value = resp 
      })
      .finally(()=>{
        getUserPosts('superman')
        isLoading.value = false
        });

    getLikes().then(resp=>{
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

    onMounted(()=>{

      getPosts()
      getLikes()
      getComments()
      
    })

    return { changeProfile,currentUser,isLoading}
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

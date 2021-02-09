<template>
  <div class="p-col-8 p-offset-2 container">
    <div class="p-gird p-offset-1">
      <h1>Instasuper #1</h1>
    </div>
    <div class="p-col-12">
      <h1>Instasuper #2</h1>
      <div class="p-grid nested-grid">
        <div class="p-col-4" style="border-color: red">
          <div class="p-col-12 p-mt-3">
            <div class="p-grid" style="border-color: blue">
              <div class="profile-picture">
                <img src="@/assets/superman.png" />
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
                <div class="p-mt-2 p-col-4 users selectedProfile" @click="changeProfile('superman')">
                  <img src="@/assets/superman.png" class="i" />
                  <span>Superman</span>
                </div>
                <div class="p-mt-2 p-col-4 users " @click="changeProfile('batman')">
                  <img src="@/assets/batman.png" class="i" />
                  <span>Batman</span>
                </div>
                <div class="p-mt-2 p-col-4 users" @click="changeProfile('wonderWoman')">
                  <img src="@/assets/aquaman.png" class="i" />
                  <span>Aquaman</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import {getComments, getLikes, getPosts} from './services/superhero-service.js'
export default {
  name: "App",

  setup(){
    const currentUser = ref({user:'superman',posts:[], comments:[], likes:[]})
    const posts = ref(null);
    const comments = ref(null);
    const likes = ref(null);
    
    
    const changeProfile = (user) => {
      currentUser.value.user = user
      getUserComments(user)
    }

    const getUserComments = (user) => {
      comments.value.map((c,index)=>{
              if(c.user == user){
                currentUser.value.comments[index] = c;
              }
            })
    }
   
    onMounted(()=>{
      getPosts().then(resp=>{
         posts.value = resp
            }).finally(()=>{

              posts.value.map((p,index)=>{
                if (p.user == currentUser.value.user) {
                  currentUser.value.posts[index] = p
                }
              })

          currentUser.value.totalPosts = Object.keys(currentUser.value.posts).length
          });

      getComments().then(resp=>{
         comments.value = resp
            }).finally(()=>{

            comments.value.map((c,index)=>{
              if(c.user == currentUser.value.user){
                currentUser.value.comments[index] = c;
              }
            })

            currentUser.value.totalComments = Object.keys(currentUser.value.comments).length 
          });

      getLikes().then(resp=>{
         likes.value = resp
            }).finally(()=>{
              likes.value.map((l,index)=>{
                if (l.user == currentUser.value.user) {
                  currentUser.value.likes[index] = l;
                }
            })

            currentUser.value.totalLikes = Object.keys(currentUser.value.likes).length
          });
    })


    return { changeProfile,currentUser}
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

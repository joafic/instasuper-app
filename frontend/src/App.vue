<template>

<div class="p-col-6 p-offset-3 container">
  <div class="p-col-12 p-offset-1">
    <h1>Instasuper #1</h1>
    </div>
  <div class="p-col-12">
    <h1>Instasuper #2</h1>
    <div class="p-grid">
      <div class="profile-picture">
        <img src="@/assets/blackWidow.png">
      </div>
      <div class="p-col-3">
        <div class="p-d-flex p-flex-column p-mt-1 p-ml-2">
          <div class="p-mb-2">
            <b>Spiderman</b>
          </div>
          <div class="p-d-flex p-flex-column status">
            <span class="p-mb-1"><b>74 </b>posts</span>
            <span class="p-mb-1"><b>384 </b>curtidas</span>
            <span><b>191 </b>comentários</span>
          </div>
        </div>
      </div>
      <div class="p-offset-s1 p-col-7">
        <div class=""><b> Visualizar como:</b></div>
      <div class="p-d-flex p-grid">
        <div class="p-mt-2 p-col-4 users">
          <img src="@/assets/blackWidow.png" class="i">
          <span >Superman</span>
        </div>
        <div class="p-mt-2 p-col-4 users">
          <img src="@/assets/blackWidow.png"  class="i" >
          <span >Batman</span>
        </div>
        <div class="p-mt-2 p-col-4 users">
          <img src="@/assets/blackWidow.png" class="i">
          <span >Aquaman</span>
        </div>
      </div>
      </div>
    </div>
    
  </div>
</div>

</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.profile-picture{
  display: flex;
  flex-direction: row;
  width: 6em;
  height: 6em;
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
  font-size: .85em;
  font-weight: 500;
  color: rgb(116, 116, 117);
}
.status b {
 color:black
}
.i{
  border-radius: 50%;
  height: 100%;
  width: 35%;
}
.users{
  /**border:1px solid rgb(39, 39, 39);*/
  cursor:pointer;
  width: 4em;
  height: 4em;
}
.users:hover{
  background-color: rgba(0, 0, 0, 0.123);
}
.users span {
  font-size: .9em;
  margin-left: .3em;
}
.container{
  border:1px solid lightgray;
  background-color: hsla(0, 0%, 95%, 0.424)
}
</style>

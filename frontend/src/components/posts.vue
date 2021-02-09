<template>
  <div class="p-grid" style="border:1px solid red">
      <div class="p-col-6" style="border:1px solid black">{{user.user}}</div>
      <div class="p-col-6" style="border:1px solid black">
          <div class="p-col-6" style="border:1px solid black">6</div>
      <div class="p-col-6" style="border:1px solid black">6</div>
      </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
//import { getPostImage } from '../services/superhero-service'
export default {
    props:{
        currentUser:{},
    },
    setup(props){
        const user = ref(props.currentUser) ;

        onMounted(()=>{
           
            
          //getPostImage(user.value.posts[0].picture).then(resp=>{ console.log(resp) })

          //getPostImage(user.value.posts[0].picture).then(resp=>{ console.log(resp) });
        })

        return {user}
    }


}
</script>

<style>

</style>
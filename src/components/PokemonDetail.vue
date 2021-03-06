<template>
<h1>Detalhes</h1>

<loader v-if="isLoading"></loader>
<div v-if="info">
    <div class="div-row">
        <img :src="image">
        <h2>{{info.name}}</h2>
    </div>
    <div class="div-row">
        <h4>Experiência: </h4> {{info.base_experience}}
    </div>
    <div class="div-row">
        <h4>Peso:</h4>{{info.weight}}
    </div>
    <div class="div-row">
        <h4>Altura: </h4>{{info.height}}
    </div>
    <div class="div-images">
        <div v-for="(value, key,index) in info.sprites" :key="index">
        <img v-if="value && typeof value ==='string'" :src="value">
    </div>
    </div>
</div>
<button class="btn-voltar" @click="back">Voltar</button>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import {useRoute, useRouter } from 'vue-router';
import { getPokemon, getPokemonImageUrl } from '../services/pokemon-service';
import Loader from './Loader.vue';
export default {
  components: { Loader },
    setup(){
        const router = useRouter();
        const route = useRoute();
        const info = ref(null)
        const isLoading = ref(false);

        onMounted(()=>{
            isLoading.value = true;
            getPokemon(route.params.id).then(resp=>{
                info.value = resp
            }).finally(()=>{ 
                isLoading.value = false;
            });
        });

        const image = computed(() => getPokemonImageUrl(info.value.id));
        
        const back = () => router.replace('/')
       




        return {info,isLoading,image,back}
    }

}
</script>

<style scoped>
.div-row{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.btn-voltar {
    background-color: rgb(74, 74, 226);
    border: none;
    color: white;
    padding: 10px 27px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
}

.div-images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

</style>
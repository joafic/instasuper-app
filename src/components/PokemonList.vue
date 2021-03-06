<template>
<h1>Pokémon APP</h1>
<loader v-if="isLoading"></loader>
    <div class='pokemon' v-for="(pokemon, i) in list" :key="i"
    @click="selectPokemon(getPokemonId(pokemon.url))">
        <img :src="getPokemonImage(getPokemonId(pokemon.url))">
        {{ pokemon.name }}
    </div>
        

</template>

<script>
import { getPokemonList, getPokemonImageUrl } from '../services/pokemon-service.js'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Loader from './Loader';

export default {
    components:{
        Loader
    },
    setup () {
        const list = ref([])
        const router = useRouter();
        const isLoading = ref(false);

        onMounted(() => {
            isLoading.value = true;
            getPokemonList().then(resp=>{
                list.value = resp.results
            }).finally(()=>{
                isLoading.value = false;
            });
        });

        const getPokemonId = url => 
            url.replace('https://pokeapi.co/api/v2/pokemon/','')
            .replace('/','')

        const getPokemonImage = id => getPokemonImageUrl(id)

        const selectPokemon= id => router.push({name:'pokemon', params: {id}})


    return { list, getPokemonImage,getPokemonId, selectPokemon, isLoading }
    }
}
</script>

<style scoped>

.pokemon {
    display: flex;
    align-items: center;
    border: 1px solid lightgray;
    border-radius: .2rem;
    margin: .5rem;
    cursor: pointer;

}

</style>
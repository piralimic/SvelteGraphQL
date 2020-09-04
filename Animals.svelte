<script>
  import { getClient, query } from "svelte-apollo";
  import { GET_ANIMALS } from "./queries";

  const client = getClient();
  const animals = query(client, { query: GET_ANIMALS });

  function hasSponsor(sponsorings) {
    return sponsorings.length > 0 ? true : false;
  }
</script>

<h2>Animals</h2>
{#await $animals}
  Loading...
{:then result}
  <p>Total: {result.data.animal.length}</p>
  <hr>
  {#each result.data.animal as animal}
    Référence {animal.reference_number}
    <h3>{animal.name}</h3>
    <p>{animal.type.value}</p>
    <p>{animal.sex.value}</p>
    <p>{animal.birthdate}</p>
    <img alt="picture of {animal.name}" src="{animal.picture_url}" width="200px">
    <p>{animal.description}</p>
    {#if hasSponsor(animal.sponsorings)}
      {animal.name} est parrainé par 
      {#each animal.sponsorings as sponsoring}
        {sponsoring.sponsor.first_name} {sponsoring.sponsor.last_name}
      {/each}
    {/if}
    <hr>
  {/each}
{:catch error}
  {error}
{/await}
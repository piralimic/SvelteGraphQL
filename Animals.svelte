<script>
  import { getClient, query } from "svelte-apollo";
  import { GET_ANIMALS } from "./queries";
  import { MONTHS } from "./utils";

  const client = getClient();
  const animals = query(client, { query: GET_ANIMALS });

  const today = new Date(Date.now());

  function isFemale(animal) {
    return animal.gender.id === 2 ? "e" : "";
  }

  function formattedDate(birthdate) {
    const date = new Date(birthdate);
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }

  function getAge(birthdate) {
    const birth = new Date(birthdate);
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    if (months < 0) {
      months += 12;
      years--;
    }
    let result = `${years} an${years > 1 ? "s" : ""}`;
    if (months > 0) {
      result = `${result} et ${months} mois`;
    }
    return result;
  }
</script>

<h2>Animals</h2>
{#await $animals}
  Loading...
{:then result}
  <p>Total: {result.data.animals.length}</p>
  <hr>
  {#each result.data.animals as animal}
    Référence {animal.reference_number}
    <h3>{animal.name}</h3>
    <p>{animal.species.value}</p>
    <p>{animal.gender.value}</p>
    <p>Né{isFemale(animal)} le {formattedDate(animal.birthdate)}</p>
    <p>({getAge(animal.birthdate)})</p>
    <img alt="picture of {animal.name}" src="{animal.picture_url}" width="200px">
    <p>{animal.description}</p>
    {#if animal.sponsorings.length > 0}
      {animal.name} est parrainé{isFemale(animal)} par 
      {#each animal.sponsorings as sponsoring}
        {sponsoring.sponsor.first_name} {sponsoring.sponsor.last_name}
      {/each}
    {/if}
    <hr>
  {/each}
{:catch error}
  {error}
{/await}
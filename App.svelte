<script>
  import Animal from "./Animals.svelte";

  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";

  const client = new ApolloClient({
    uri: "https://known-rattler-86.hasura.app/v1/graphql"
  });

  setClient(client);
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<main>
	<h1>Svelte GraphQL</h1>
  <Animal />
</main>
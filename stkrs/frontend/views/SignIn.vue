
<template>
  <div class="tw-grid tw-h-full tw-w-full tw-place-content-center tw-content-center">
    <div>
      <h1>Internet Identity Client</h1>
      <h2>You are not authenticated</h2>
      <p>To log in, click this button!</p>
      <button type="button" id="loginButton">Log in</button>
    </div>
  </div>
</template>

<script>
  import { AuthClient } from "@dfinity/auth-client";
  
  export default {
    name: 'SignIn',

    data: () => ({
      client: null,
      clientReady: false,
      principal: '',
      signedIn: false,
    }),

    methods: {
      async checkLogIn() {
        if (await authClient.isAuthenticated()) {
          handleAuthenticated(authClient);
        }
      },
      async handleAuthenticated(authClient) {
        const idenityt = await authClient.getIdentity();
        const whoami_actor = createActor(canisterId, {
          agentOptions: {
            identity,
          },
        });
        authClient.idleManager?.registerCallback(() => {
          Actor.agentOf(whoami_actor)?.invalidateIdentity?.();
          renderIndex();
        });
        //redirect goes here to a logged in wall or something
      }
    },
    async mounted() {
      this.client = await AuthClient.create()
      clientReady.value = true
      const isAuthenticated = await client.isAuthenticated()

      if (isAuthenticated) {
        const identity = client.getIdentity()
        principal.value = identity.getPrincipal().toString()
        signedIn.value = true
      }



      const authClient = await AuthClient.create();
      const loginButton = document.getElementById(
        "loginButton"
      );

      const days = BigInt(4);
      const hours = BigInt(24);
      const nanoseconds = BigInt(3600000000000);

      loginButton.onclick = async () => {
        await authClient.login({
          onSuccess: async () => {
            handleAuthenticated(authClient);
          },
          identityProvider:
            process.env.DFX_NETWORK === "ic"
              ? "https://identity.ic0.app/#authorize"
              : process.env.LOCAL_II_CANISTER,
          // Maximum authorization expiration is 8 days
          maxTimeToLive: days * hours * nanoseconds,
        });
      };
    }
  }
</script>

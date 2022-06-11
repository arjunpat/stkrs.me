
<template>
  <div class="tw-justify-center tw-h-full tw-pt-16 tw-bg-blue-600">
      <PaintDripSection class="-tw-mt-4" color="blue-600">
    <div class="tw-grid tw-justify-center"> 
        <template>
            <h1 class="tw-text-white tw-text-6xl tw-font-bold text-center">StkrWalls With: </h1>
            <Sticker class="tw-pt-4" :src="sharedStkr" showName> </Sticker>
            <div class="tw-text-white tw-text-xl tw-font-bold text-center"> {{ name }} </div>
        </template>
        
        <div class="tw-w-screen tw-m-8 tw-grid tw-h-96 tw-justify-self-center tw-pt-5 tw-overflow-auto"> 
            <ProfileImage 
            horizontalDisplay
            class="tw-text-white tw-mt-5 tw-ml-32"
            v-for="item, i in users"
            :key="`popular-${i}`" 
            v-bind="item"
            />
        </div>
    </div>
    </PaintDripSection>
  </div>
</template>

<script>
  import { AuthClient } from "@dfinity/auth-client";
  import Sticker from '../components/Sticker.vue'
  import ProfileImage from '../components/ProfileImage.vue'
  import PaintDripSection from '../components/PaintDripSection.vue'
  import PaintDrip from '../components/PaintDrip.vue'


  export default {
    name: 'SharedStkrs',

    components: {
        Sticker,
        ProfileImage,
        PaintDrip,
        PaintDripSection,
    },

    data: () => ({
      client: null,
      clientReady: false,
      signedIn: false,

      sharedStkr: "https://blog.hubspot.com/hubfs/image8-2.jpg",
      name: "Google Dev",
       users: [
            {
              name: "0xFa333mousUser",
              src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343",
              principal: "Engineer",
              bio: "Worked as a cafeteria worker in UPenn, specialist in Cookies",
            },
            {
              name: "0xFamousUser",
              src: "https://preview.redd.it/n6obp98tlpx81.jpg?width=640&crop=smart&auto=webp&s=dab57706ecb0ad9f29bed995927140fbc7b179fc",
              principal: "Engineer",
              bio: "Worked as a cafeteria worker in UPenn, specialist in Cookies",
            },
            {
              name: "0xFamousUser",
              src: "https://i.pinimg.com/736x/d8/c0/03/d8c0032028f9039f0daee27a3a41c51c.jpg",
              principal: "Engineer",
              bio: "Worked as a cafeteria worker in UPenn, specialist in Cookies",
            },
            {
              name: "0xFamousUser",
              src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343",
              principal: "Engineer",
              bio: "Worked as a cafeteria worker in UPenn, specialist in Cookies",
            },
            {
              name: "0xFamousUser",
              src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343",
              principal: "Engineer",
              bio: "Worked as a cafeteria worker in UPenn, specialist in Cookies",
            },
       ],
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

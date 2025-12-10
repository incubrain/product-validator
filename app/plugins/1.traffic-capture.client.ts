// plugins/1.traffic-capture.client.ts
export default defineNuxtPlugin(() => {
  const { getUserId } = useUserIdentity();

  getUserId();
});
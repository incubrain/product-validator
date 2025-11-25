// plugins/1.traffic-capture.client.ts
export default defineNuxtPlugin(() => {
  const { captureSource } = useTrafficSource();
  const { getUserId } = useUserIdentity();

  getUserId();
  captureSource();
});
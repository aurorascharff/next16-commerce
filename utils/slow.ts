export async function slow(delay: number = 1000) {
  await new Promise(resolve => {
    return setTimeout(resolve, delay);
  });
}

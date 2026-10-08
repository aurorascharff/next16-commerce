export async function slow(delay: number = 200) {
  await new Promise(resolve => {
    return setTimeout(resolve, delay);
  });
}

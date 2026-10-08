export const productTags = {
  saved: (accountId: string, productId: number) => `saved-product:${accountId}:${productId}`,
  savedList: (accountId: string) => `saved-products:${accountId}`,
};

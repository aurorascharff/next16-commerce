export const productTags = {
  savedList: (accountId: string) => `saved-products:${accountId}`,
  savedView: (productId: number) => `saved-product-view:${productId}`,
};

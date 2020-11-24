export const productMapper = (data) => {
  const allOwnerIds = data.map((item) => item.product.owner.id);

  const ownerIds = allOwnerIds.filter((item, index) => {
    return allOwnerIds.indexOf(item) === index;
  });

  const products = ownerIds.map((ownerId) => {
    const productsOfOwner = data.filter(
      (item) => item.product.ownerId === ownerId
    );

    return {
      owner: productsOfOwner[0].product.owner,
      products: productsOfOwner,
    };
  });

  return products;
};

export const checkProduct = (collection, id) => {
  const collectionIds = collection.map((item) => item.productId);

  return collectionIds.includes(Number(id));
};

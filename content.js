window.renderCatalogPage([
  { containerId: 'containerClothing', filter: function (product) { return product.category === 'clothing'; } },
  { containerId: 'containerAccessories', filter: function (product) { return product.category === 'accessories'; } },
  { containerId: 'containerBags', filter: function (product) { return product.category === 'bags'; } },
  { containerId: 'containerSale', filter: function (product) { return product.onSale; } }
]);

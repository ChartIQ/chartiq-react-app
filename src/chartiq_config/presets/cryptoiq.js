export default () => Promise.all([
  import(/* webpackChunkName: "cryptoiq" */ 'chartiq/plugins/cryptoiq/cryptoiq'),
  import(/* webpackChunkName: "marketdepth" */ 'chartiq/plugins/cryptoiq/marketdepth'),
  import(/* webpackChunkName: "orderbook" */ 'chartiq/plugins/cryptoiq/orderbook'),
  import(/* webpackChunkName: "L2_simulator" */ 'chartiq/examples/feeds/L2_simulator')
]);


export default () => Promise.all([
  import(/* webpackChunkName: "cryptoiq" */ 'chartiq/plugins/activetrader/cryptoiq'),
  import(/* webpackChunkName: "marketdepth" */ 'chartiq/plugins/activetrader/marketdepth'),
  import(/* webpackChunkName: "orderbook" */ 'chartiq/plugins/activetrader/orderbook'),
  import(/* webpackChunkName: "L2_simulator" */ 'chartiq/examples/feeds/L2_simulator')
]);

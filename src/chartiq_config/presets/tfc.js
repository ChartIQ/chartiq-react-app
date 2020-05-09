export default () => Promise.all([
  import('chartiq/plugins/tfc/tfc-loader'),
  import('chartiq/plugins/tfc/tfc-demo') 
]);

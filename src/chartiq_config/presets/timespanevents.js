export default () => Promise.all([
  import('chartiq/plugins/timespanevent/timespanevent'),
  import('chartiq/plugins/timespanevent/examples/timeSpanEventSample')
]);

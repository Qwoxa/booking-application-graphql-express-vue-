<template>
  <div>
    Chart is going to be here
  </div>
</template>

<script>
// import * as d3 from 'd3';

export default {
  props: ['bookings'],
  data() {
    return {
      buckets: {
        cheap: 100,
        normal: 200,
        expensive: Infinity,
      },
      height: 600,
      width: 600,
    };
  },
  mathods: {
    packChart() {},
  },
  computed: {
    output() {
      let prevValue = 0;
      const generalOutput = Object.entries(this.buckets).map(
        ([bucketName, bucketValue]) => {
          const currentCount = this.bookings.reduce((accum, cur) => {
            if (cur.event.price > prevValue && cur.event.price < bucketValue)
              return accum + 1;
            return accum;
          }, 0);

          prevValue = bucketValue;
          return [bucketName, currentCount];
        }
      );
      return Object.fromEntries(generalOutput);
    },
  },
};
</script>

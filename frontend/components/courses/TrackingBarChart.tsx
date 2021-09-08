import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const TrackingBarChart = ({ stats }) => {
  let data: any = {
    series: [
      {
        name: 'Actual',
        data: stats,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: ['#00E396'],
      dataLabels: {
        formatter: function (val, opt) {
          const goals =
            opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals;

          if (goals && goals.length) {
            return `${val} / ${goals[0].value}`;
          }
          return val;
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['Actual', 'Expected'],
        markers: {
          fillColors: ['#00E396', '#775DD0'],
        },
      },
    },
  };

  const [state, setState] = useState(data);

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        height={300}
        type='bar'
      />
    </div>
  );
};

export default TrackingBarChart;

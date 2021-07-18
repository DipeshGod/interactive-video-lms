import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'));

const TrackingBarChart = () => {
  let data: any = {
    series: [
      {
        name: 'Actual',
        data: [
          {
            x: 'Chapter 1',
            goals: [
              {
                name: 'Expected',
                value: 14,
                strokeWidth: 5,
                strokeColor: '#775DD0',
              },
            ],
          },
          {
            x: 'Chapter 2',
            y: 44,
            goals: [
              {
                name: 'Expected',
                value: 54,
                strokeWidth: 5,
                strokeColor: '#775DD0',
              },
            ],
          },
          {
            x: 'Chapter 3',
            y: 54,
            goals: [
              {
                name: 'Expected',
                value: 52,
                strokeWidth: 5,
                strokeColor: '#775DD0',
              },
            ],
          },
          {
            x: 'Chapter 4',
            y: 66,
            goals: [
              {
                name: 'Expected',
                value: 65,
                strokeWidth: 5,
                strokeColor: '#775DD0',
              },
            ],
          },
          {
            x: 'Chapter 5',
            y: 81,
            goals: [
              {
                name: 'Expected',
                value: 66,
                strokeWidth: 5,
                strokeColor: '#775DD0',
              },
            ],
          },
          {
            x: 'Chapter 6',
            y: 67,
            goals: [
              {
                name: 'Expected',
                value: 70,
                strokeWidth: 5,
                strokeColor: '#775DD0',
              },
            ],
          },
        ],
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

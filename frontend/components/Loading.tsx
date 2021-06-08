import { Typography } from '@material-ui/core';

const Loading = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-10%)',
      }}
    >
      <svg>
        <g transform='translate(50 50)'>
          <g transform='scale(0.7)'>
            <g transform='translate(-50 -50)'>
              <g>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  repeatCount='indefinite'
                  values='0 50 50;360 50 50'
                  keyTimes='0;1'
                  dur='0.7575757575757576s'
                ></animateTransform>
                <path
                  fillOpacity='0.8'
                  fill='#e15b64'
                  d='M50 50L50 0A50 50 0 0 1 100 50Z'
                ></path>
              </g>
              <g>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  repeatCount='indefinite'
                  values='0 50 50;360 50 50'
                  keyTimes='0;1'
                  dur='1.0101010101010102s'
                ></animateTransform>
                <path
                  fillOpacity='0.8'
                  fill='#f47e60'
                  d='M50 50L50 0A50 50 0 0 1 100 50Z'
                  transform='rotate(90 50 50)'
                ></path>
              </g>
              <g>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  repeatCount='indefinite'
                  values='0 50 50;360 50 50'
                  keyTimes='0;1'
                  dur='1.5151515151515151s'
                ></animateTransform>
                <path
                  fillOpacity='0.8'
                  fill='#f8b26a'
                  d='M50 50L50 0A50 50 0 0 1 100 50Z'
                  transform='rotate(180 50 50)'
                ></path>
              </g>
              <g>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  repeatCount='indefinite'
                  values='0 50 50;360 50 50'
                  keyTimes='0;1'
                  dur='3.0303030303030303s'
                ></animateTransform>
                <path
                  fillOpacity='0.8'
                  fill='#abbd81'
                  d='M50 50L50 0A50 50 0 0 1 100 50Z'
                  transform='rotate(270 50 50)'
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Loading;

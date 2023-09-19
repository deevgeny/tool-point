// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePieCanvas } from '@nivo/pie';

export const data = [
  {
    "id": "Автомобильные",
    "label": "Автомобильные",
    "value": 12,
    //"color": "hsl(359, 70%, 50%)"
  },
  {
    "id": "Индустриальные",
    "label": "Индустриальные",
    "value": 25,
    //"color": "hsl(195, 70%, 50%)"
  },
  {
    "id": "Морские",
    "label": "Морские",
    "value": 3,
    //"color": "hsl(240, 70%, 50%)"
  },
  {
    "id": "Архитектурные",
    "label": "Архитектурные",
    "value": 30,
    //"color": "hsl(111, 70%, 50%)"
  },

]

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function Pie({ data /* see data tab */ }) {
  return (
    <ResponsivePieCanvas
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'accent' }}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            0.2
          ]
        ]
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2
          ]
        ]
      }}
/*       legends={[
        {
          anchor: 'bottom',
          direction: 'column',
          justify: false,
          translateX: 50,
          translateY: 0,
          itemsSpacing: 10,
          itemWidth: 100,
          itemHeight: 10,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 10,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]} */
    />
  );
}
export interface IBtn {
  type: 'spec' | 'action' | 'number' | 'none';
  value: string;
}

export const btns: IBtn[] = [
  { type: 'spec', value: 'AC' },
  {
    type: 'spec',
    value: '±',
  },
  {
    type: 'spec',
    value: '%',
  },
  {
    type: 'action',
    value: '÷',
  },
  {
    type: 'number',
    value: '7',
  },
  {
    type: 'number',
    value: '8',
  },
  {
    type: 'number',
    value: '9',
  },
  {
    type: 'action',
    value: '×',
  },
  {
    type: 'number',
    value: '4',
  },
  {
    type: 'number',
    value: '5',
  },
  {
    type: 'number',
    value: '6',
  },
  {
    type: 'action',
    value: '-',
  },
  {
    type: 'number',
    value: '1',
  },
  {
    type: 'number',
    value: '2',
  },
  {
    type: 'number',
    value: '3',
  },
  {
    type: 'action',
    value: '+',
  },
  {
    type: 'number',
    value: '0',
  },
  {
    type: 'none',
    value: '',
  },
  {
    type: 'number',
    value: ',',
  },

  {
    type: 'action',
    value: '=',
  },
];

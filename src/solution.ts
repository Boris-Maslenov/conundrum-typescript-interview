import { ChartDataModel } from './chart-data.model';

export const base: ChartDataModel = {
  names: ['car 1', 'car 2', 'car 3', 'car 4'],
  values: [
    [1, 2, 3, 4],
    [2, 4, 1, 4],
    [2, 3, 1, 0],
    [1, null, null, null, null],
  ],
};

export const incr: ChartDataModel = {
  names: ['car 1', 'car 2', 'car 7', 'car 8'],
  values: [[4], [4], [0], [1]],
};

export const expectedResult: ChartDataModel = {
  names: ['car 1', 'car 2', 'car 3', 'car 7', 'car 8'],
  values: [
    [2, 3, 4, 4],
    [4, 1, 4, 4],
    [3, 1, 0, null],
    [null, null, null, 0],
    [null, null, null, 1],
  ],
};

type valInArr = number | null;

export function increment(base: ChartDataModel, incr: ChartDataModel): ChartDataModel {

const names: string[] = [];
const values: valInArr[][] = [];

const addToArr = (name:string, value: valInArr, i:number, isNew: boolean):void => {
  const removeIndex = (base.values[i].length) - 3;
  const sliceArr = base.values[i].slice(removeIndex);
  sliceArr.push(value);
  const newArr = [...sliceArr];
  const newArrUniq = new Set(newArr);
  if( !(newArrUniq.size === 1 && typeof newArrUniq === 'object') ){
    names.push(name);
    isNew ? values.push( [null, null, null, value]) : values.push( newArr)
  }
}

incr.names.forEach((incName, i) => {
  if(incName === base.names[i]){
    addToArr(incName, incr.values[i][0], i, false);
  } else {
    addToArr(base.names[i], null, i, false);
    addToArr(incName, incr.values[i][0], i, true);
  }
});

  return { names, values };

}


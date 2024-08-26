import React from 'react';
import { useSelector } from 'react-redux';
import {  Car, State } from '../../helpers/types';
import './styles.scss';
import { formatDate } from '../../helpers/index.ts';

const areAllValuesSame = (values: any[]): boolean => {
    return values.every(val => val === values[0]);
  };


const Compare = () => {

    const comparedCar = useSelector((state: State) => state.compare)
    const products: Car[] = Object.values(comparedCar) ?? [];
    
    if(products.length < 2) {
        return null;
    }

    const getFieldValues = (field: keyof Car) => products.map(product => product[field]);

    // Determine which rows to render
    const rows = [
      {
        label: 'Model',
        values: getFieldValues('modelName')
      },
      {
        label: 'Price',
        values: getFieldValues('priceOverview').map((price: any) => price.formattedPrice)
      },
      {
        label: 'Rating',
        values: getFieldValues('carRating')
      },
      {
        label: 'Just Launched',
        values: getFieldValues('showJustLaunchedBadge').map((badge: any) => badge ? 'Yes' : 'No')
      },
      {
        label: 'Launched On',
        values: getFieldValues('launchedOn').map(formatDate)
      }
    ];
  
    return (
      <div className="row compare">
        <div className="col-12 mt-5 text-center">
          <table className="table">
            <thead className="thead-default">
              <tr>
                <th></th>
                {products.map(product => (
                <th key={product.modelId}>{product.makeName}</th>
              ))}

              </tr>
            </thead>
            <tbody>
            {rows
              .filter(row => !areAllValuesSame(row.values)) // Filter out rows where all values are the same
              .map((row, index) => (
                <tr key={index} className={row.label === 'Price' ? 'price' : row.label === 'Just Launched' ? 'colors' : 'condition'}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, i) => (
                    <td key={products[i].modelId} className="text-center">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    );
};


export default Compare;
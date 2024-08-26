import React, { useCallback, useMemo } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import './cards.css';
import { getCarById } from '../../stores/selectors.ts';
import { Car, State } from '../../helpers/types.ts';
import useCompare from '../../Controllers/useCompare.ts';
import { fetchCarDetails } from '../../stores/actionCreators.ts';


const CardUI = (props: CardProps) => {
            const{ id, handleScrollToCompare } = props
            const dispatch = useDispatch<any>()
            const car = useSelector((state: State) => getCarById(state, id));
            const { handleCompare } = useCompare({ id , handleScrollToCompare });
            const comparedCar = useSelector((state: State) => state.compare)
            const { makeName, hostUrl, originalImagePath, priceOverview, modelName } = car ?? {};
            const { formattedPrice, label } = priceOverview ?? {};
            const imageUrl = hostUrl + "/664x374" + originalImagePath;
            const title = makeName + ' ' + modelName;
            const isCarBeenCompared  = useMemo(() => comparedCar[id] , [id, comparedCar]);
            const btnText = isCarBeenCompared ? 'Remove'  : 'Compare'

            const handleScrollToTop = useCallback(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, []);

            const handleViewClick = useCallback(() => {
                dispatch(fetchCarDetails(car?.modelName ?? ''));
                handleScrollToTop();
            }, [car, dispatch, handleScrollToTop] );

           
  
    return (
      <div className="card">
        <div className="card-container">
          <div className="card-top-content">
            <div className="card-container-image">
              <img src={imageUrl} alt={title} />
            </div>
  
            <div className="card-container-body">
              <h2>{title}</h2>
              <div className='vspace-evenly'>
              <span className="Item__category fs12">{label}</span>
              <span className="fw600 fs12">{formattedPrice}</span>
              </div>
            </div>
          </div>
          <div className="card__overlay">
            <div className="overlay__text">
              <h3>{title}</h3>
              <div className='flex'>
              <div className="card-compare cur-po" onClick={handleViewClick}>
                View
              </div>
              <div className="card-compare cur-po" onClick={handleCompare}>
                {btnText}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  type CardProps = {
    id: number;
    handleScrollToCompare: () => void;
  };

const Cards = ( { handleScrollToCompare }  : {handleScrollToCompare : () => void }) => {

    const listDto = useSelector((state: State) => state.list);
    const { items: list , loading , error } = listDto ?? {};

    if(loading) {
        return <div className='card-list-container'>
            {
                Array.from({length: 8}).map((_, index) => <div key={index} className='card_loader'></div>)
            }
        </div>
    }



    if(error) {
        return <div className='card-list-container'>
          <div className='absolute-center'>
              <img width='100%' height='100%' alt='error'
              src='https://cdn.dribbble.com/users/576558/screenshots/3801660/media/5a3848aa0854d0d0fb01e2ad948cc09f.png?resize=800x600&vertical=center'/>
              </div>
        </div>
    }



    return (
        <div className="card-list-container">
          {list.map((car: Car) => <div key={car.originalImagePath}> <CardUI id = {car.modelId} handleScrollToCompare ={handleScrollToCompare} />  </div> )}
        </div>
      );
}


export default Cards;
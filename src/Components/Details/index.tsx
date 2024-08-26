import React from 'react';
import { State } from '../../helpers/types';
import { useSelector } from 'react-redux';
import useCompare from '../../Controllers/useCompare.ts';
import './details.css'
import { Rating } from 'react-simple-star-rating';
import { formatDate } from '../../helpers/index.ts';
import Loader from '../Loader/index.tsx';
import NotFoundError from '../Error/notfound.tsx';


const Details = ({handleScrollToCompare} : {handleScrollToCompare: () => void}) => {

    const details = useSelector((state: State) => state.details);
    const { info, loading , error } = details;
    const { isCarBeenCompared,  handleCompare } = useCompare({ id: info.modelId || '', handleScrollToCompare });


    if(loading) {
        return <Loader/>
    }

    if(error) {
       return <NotFoundError />
    }

    if(Object.keys(info).length === 0) {
        return null;
    }


        const {
          makeName,
          hostUrl,
          originalImagePath,
          priceOverview,
          launchedOn,
          modelName,
          showJustLaunchedBadge,
          carRating,
        } = info;

        const { formattedPrice, label } = priceOverview;
        const carName = makeName.toUpperCase();
    
        const imageUrl = hostUrl + "/1056x594" + originalImagePath;
        return (
          <section className="Detail">
            <div className="Detail__thumbnail">
              <img src={imageUrl} alt="" />
            </div>
    
            <div className="Detail__info__container">
              <div className="Detail__info--header">
                <div className='header'>{carName} {modelName}</div>
              </div>
    
              <div className="ribbon">Hurry Up! Offer Ends in Few Days</div>
              <br />
              {showJustLaunchedBadge && (
                <div className="ribbon just-launched-ribbon">Just Launched</div>
              )}
              <div className="Detail__info">
                <span className="Detail_price">
                   {label} :&nbsp; {formattedPrice}
                </span>
              </div>
    
              <div className="Detail__info">
              <Rating onClick={() => {}} initialValue={carRating} readonly={true} allowFraction={true}/>
              </div>
    
              <div className="Detail__info">
                <span className="label">Launched On:</span>
                <span className="value">{formatDate(launchedOn)}</span>
              </div>
    
              <div className="Detail__info">
                <span className="label">Model Name:</span>
                <span className="value">{modelName}</span>
              </div>
    
              <div className="valign-wrapper">
                <button
                  className="cart-btn valign-wrapper vcenter cur-no"
                  onClick={() => {}}
                >
                  Add to Cart
                </button>
    
                <button
                  className="cart-btn valign-wrapper vcenter cur-po"
                  onClick={handleCompare}
                  style={{ marginLeft: "8px" }}
                >
                 { isCarBeenCompared ? 'Remove' :  'Compare' }
                </button>
              </div>
            </div>
          </section>
        );
}


export default Details;
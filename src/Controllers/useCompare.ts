import { useDispatch, useSelector } from "react-redux";
import { State } from "../helpers/types.ts";
import { getCarById } from "../stores/selectors.ts";
import { useCallback } from "react";
import { Toastify } from "../Common/Toast/index.ts";

    const useCompare = (props: { id: number, handleScrollToCompare: () => void} ) => {

    const { id , handleScrollToCompare } = props;
    const car = useSelector((state: State) => getCarById(state, id));
    const dispatch = useDispatch<any>()
    const comparedCar = useSelector((state: State) => state.compare)
    const isCarBeenCompared  = comparedCar[id];

    const handleCompare = useCallback(() => {

        const currentComparedCars = Object.keys(comparedCar).length

        if(currentComparedCars === 3 && !isCarBeenCompared) {
            Toastify.error({ title: 'You can only compare 3 cars at a time' });
            return;
        }

       

        if(!isCarBeenCompared) {
        const payload = {
            key: props.id,
            value: car
        }

        if(currentComparedCars > 0) {
            handleScrollToCompare();

        }

        dispatch({
            type: 'ADD_TO_COMPARE',
            payload
        })


    if(currentComparedCars === 0) {
        Toastify.warn({ title: 'Add One More Car to see the comparsion' });

    } else {
        Toastify.success({ title: 'Car successfully added to the compared list' });
    }

    } else {
        dispatch({
            type: 'REMOVE_FROM_COMPARE',
            payload: props.id
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comparedCar, dispatch, props.id])

    return  {
        isCarBeenCompared,
        handleCompare
    }
}


export default useCompare
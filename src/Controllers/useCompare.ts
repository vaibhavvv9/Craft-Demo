import { useDispatch, useSelector } from "react-redux";
import { State } from "../helpers/types.ts";
import { getCarById } from "../stores/selectors.ts";
import { useCallback } from "react";

    const useCompare = (props: { id: number, handleScrollToCompare: () => void} ) => {

    const { id , handleScrollToCompare } = props;
    const car = useSelector((state: State) => getCarById(state, id));
    const dispatch = useDispatch<any>()
    const comparedCar = useSelector((state: State) => state.compare)
    const isCarBeenCompared  = comparedCar[id];

    const handleCompare = useCallback(() => {

        if(Object.keys(comparedCar).length === 3 && !isCarBeenCompared) {
            alert('You can only compare 3 cars at a time');
            return;
        }

        if(Object.keys(comparedCar).length > 0) {
            handleScrollToCompare();

        }

        if(!isCarBeenCompared) {
        const payload = {
            key: props.id,
            value: car
        }

        dispatch({
            type: 'ADD_TO_COMPARE',
            payload
        })


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
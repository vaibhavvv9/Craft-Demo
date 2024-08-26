import { Car, State } from "../helpers/types";

export const getCarById = (state: State, id: number) => {
    return state.list.items.find((car: Car) => car.modelId === id);
};
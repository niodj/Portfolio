import { initialState } from "../../store"

export const isLoadingReducer=(state: any = initialState.isLoading, action: any): any => {
    
    if (action.type === 'ok') {
        return {...state, isLoading:false}
    } else return { ...state, isLoading: true };
}
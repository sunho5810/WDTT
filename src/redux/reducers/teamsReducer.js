let initState = {
    teamsDataList: {},
    loading2: true
}

const teamsReducer = (state = initState, action) => {
    let {type, payload} = action;

    switch (type) {
        case "ENTRY_DATA_REQUEST":
            return{
                ...state,
                loading2: true
            }
        case "ENTRY_DATA_FAILED":
            return{
                ...state,
                loading2: true
            }
        case "GET_ENTRY_DATA_SUCCESS":
            return{
                ...state,
                teamsDataList: payload.data,
                loading2: false
            }
        
        default:
            return{...state}
    }
}

export default teamsReducer
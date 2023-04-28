let initState = {
    teamsDataList: {},
    entryDataList: {},
    loading2: true,
}

const teamsReducer = (state = initState, action) => {
    let {type, payload} = action;

    switch (type) {
        case "TEAMS_DATA_REQUEST":
            return{
                ...state,
                loading2: true,
            }
        case "TEAMS_DATA_FAILED":
            return{
                ...state,
                loading2: true,
            }
        case "GET_TEAMS_DATA_SUCCESS":
            return{
                ...state,
                teamsDataList: payload.data,
                entryDataList: payload.data2,
                loading2: false
            }
        
        default:
            return{...state}
    }
}

export default teamsReducer
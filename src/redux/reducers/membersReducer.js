let initState = {
    membersList: {},
    // updateList: {},
    // addList: {},
    loading: true
}

const membersReducer = (state = initState, action) => {
    let {type, payload} = action;

    switch (type) {
        case "MEMBERS_DATA_REQUEST":
            return{
                ...state,
                loading: true
            }

        case "MEMBERS_DATA_FAILED":
            return{
                ...state,
                loading: true
            }

        case "GET_MEMBERS_DATA_SUCCESS":
            return{
                ...state,
                membersList: payload.membersData,
                loading: false
            }

        // case "UPDATE_MEMBERS_DATA_SUCCESS":
        //     return{
        //         ...state,
        //         updateList: payload.data,
        //         loading: false
        //     }

        // case "ADD_MEMBERS_DATA_SUCCESS":
        //     return{
        //         ...state,
        //         addList: payload.data,
        //         loading: false
        //     }
        default:
            return{...state}
    }
}

export default membersReducer;
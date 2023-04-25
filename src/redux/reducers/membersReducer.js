let initState = {
    membersList: {},
    updateList: {},
    loading: true
}

const membersReducer = (state = initState, action) => {
    let {type, payload} = action;

    switch (type) {
        case "GET_MEMBERS_DATA_REQUEST":
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

        case "GET_MEMBERS_DATA_FAILED":
            return{
                ...state,
                loading: true
            }
        case "POST_MEMBERS_DATA_REQUEST":
            return{
                ...state,
                loading: true
            }

        case "POST_MEMBERS_DATA_SUCCESS":
            return{
                ...state,
                membersList: payload.data,
                loading: false
            }

        case "POST_MEMBERS_DATA_FAILED":
            return{
                ...state,
                loading: true
            }
        default:
            return{...state}
    }
}

export default membersReducer;
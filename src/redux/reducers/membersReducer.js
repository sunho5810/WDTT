let initState = {
    membersList: {},
    loading: false
}

const membersReducer = (state = initState, action) => {
    let {type, payload} = action;

    switch (type) {
        case "GET_MEMBERS_DATA_SUCCESS":
            return{
                ...state,
                membersList: payload.membersData
            }
        default:
            return{...state}
    }
}

export default membersReducer;
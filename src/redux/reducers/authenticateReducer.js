let initState = {
    authenticate: false
}

function authenticateReducer(state = initState, action){
    let {type, payload} = action;

    switch (type) {
        case "LOGIN__SUCCESS":
            return {
                ...state,
                authenticate: true
            }
        case "LOGIN__FAIL":
            return {
                ...state,
                authenticate: false
            }
        default:
            return {...state}
            
    }
}

export default authenticateReducer;
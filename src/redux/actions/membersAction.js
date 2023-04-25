import api from "../api";


function getMembersData(){
    return async(dispatch) => {
        try{
            const membersData = await api.get(`/members`);

            console.log("membersData?", membersData);

            dispatch({type: "GET_MEMBERS_DATA_SUCCESS", payload: {membersData: membersData.data}});
        } catch (error) {

        }
        
    }
}

export const membersAction = {getMembersData};
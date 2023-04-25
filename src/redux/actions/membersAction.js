import api from "../api";

function getMembersData(){
    return async(dispatch) => {
        try{
            dispatch({type: "GET_MEMBERS_DATA_REQUEST"});
            
            const membersData = await api.get(`/members`);
            
            console.log("membersData?", membersData);
            
            dispatch({type: "GET_MEMBERS_DATA_SUCCESS", payload: {membersData: membersData.data}});
        } catch (error) {
            // console.log("error");
            dispatch({type: "GET_MEMBERS_DATA_FAILED"});
        }
    }
}

function updateMembersData(data){
    return (dispatch) => {
        const updateDataList = data;
        console.log("updateMembersData->data?", updateDataList);

        dispatch({type: "UPDATE_MEMBERS_DATA", payload: {data: updateDataList}});
    }
}

export const membersAction = {getMembersData, updateMembersData};
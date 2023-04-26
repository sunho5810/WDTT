import api from "../api";

function getMembersData(){
    return async(dispatch) => {
        try{
            dispatch({type: "MEMBERS_DATA_REQUEST"});
            
            const membersData = await api.get(`/memberInfo`);
            
            console.log("membersData?", membersData);
            
            dispatch({type: "GET_MEMBERS_DATA_SUCCESS", payload: {membersData: membersData.data}});
        } catch (error) {
            // console.log("error");
            dispatch({type: "MEMBERS_DATA_FAILED"});
        }
    }
}

function updateMembersData(dataList){
    return async(dispatch) => {
        try{
            // dispatch({type: "MEMBERS_DATA_REQUEST"});

            const update_data = []
            for(var i = 0; i < dataList.length; i++){
                update_data[i] = await api.put(`/memberInfo/${dataList[i].id}`, dataList[i]);
            }

            // console.log("post->data??", data);
            // dispatch({type: "UPDATE_MEMBERS_DATA_SUCCESS", payload: {data: update_data}});

        } catch (error) {
            dispatch({type: "MEMBERS_DATA_FAILED"});
        }

        
    }
}

function addMembersData(idx, data){
    return async(dispatch) => {
        try{
            // dispatch({type: "MEMBERS_DATA_REQUEST"});

            console.log("addMembersData -> data?", data);

            const add_data = await api.post(`/memberInfo`, data);

            console.log("add_data?", add_data);

            // dispatch({type: "ADD_MEMBERS_DATA_SUCCESS", payload: {data: add_data}});

        } catch(error) {
            dispatch({type: "MEMBERS_DATA_FAILED"});
        }
    }
}

export const membersAction = {getMembersData, updateMembersData, addMembersData};
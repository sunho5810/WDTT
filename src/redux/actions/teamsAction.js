import api from "../api";

function getTeamsData(){
    return async(dispatch) => {
        try{
            dispatch({type: "ENTRY_DATA_REQUEST"});
            const teamsDataList = await api.get(`/teams`);
    
            console.log("teamsDataList?", teamsDataList);
    
            dispatch({type: "GET_ENTRY_DATA_SUCCESS", payload: {data: teamsDataList.data}});
        } catch(error){
            dispatch({type: "ENTRY_DATA_FAILED"});
        }
    }
}

function postTeamsData(entryData){
    return async(dispatch) => {
        console.log("entryData??", entryData)

        const data = await api.post(`/teams`, entryData);

        console.log("data?", data);
    }
}

function putTeamsData(entryData){
    return async(dispatch) => {
        console.log("entryData??", entryData)

        const data = await api.post(`/teams`, entryData);

        console.log("data?", data);
    }
}

export const teamsAction = {getTeamsData, postTeamsData, putTeamsData};
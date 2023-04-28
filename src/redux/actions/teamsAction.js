import api from "../api";

function getTeamsData(){
    return async(dispatch) => {
        try{
            dispatch({type: "TEAMS_DATA_REQUEST"});
            const teamsDataList = await api.get(`/teams`);
            const entryDataList = await api.get(`/members`);
    
            dispatch({type: "GET_TEAMS_DATA_SUCCESS", payload: {data: teamsDataList.data, data2: entryDataList.data}});

            // dispatch({type: "GET_ENTRY_DATA_SUCCESS", payload: {data: entryDataList.data}});


        } catch(error){
            dispatch({type: "TEAMS_DATA_FAILED"});
        }
    }
}

function getEntryList(){
    return async(dispatch) => {
        try{
            dispatch({type: "TEAMS_DATA_REQUEST"});
            const entryDataList = await api.get(`/members`);
    
            console.log("entryDataList?", entryDataList);
    
            dispatch({type: "GET_ENTRY_DATA_SUCCESS", payload: {data: entryDataList.data}});

        } catch(error){
            dispatch({type: "TEAMS_DATA_FAILED"});
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

function putTeamsData(selectedList){
    return async(dispatch) => {
        console.log("selectedList??", selectedList)

        const data = await api.put(`/teams`, selectedList);

        console.log("data?", data);
    }
}


export const teamsAction = {getTeamsData, getEntryList, postTeamsData, putTeamsData};
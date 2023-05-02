import api from "../api";

function getTeamsData(){
    return async(dispatch)=>{
        try {
            dispatch({type: "TEAMS_DATA_REQUEST"});

            const entryList = await api.get(`/entryList`);

            const teams = await api.get(`/teams`);

            const objectList = [];
            
            entryList.data.map((item, index) => {
                objectList[index] = {
                    id: item.id,
                    index: index,
                    visible: item.visible,
                    backNum: item.backNum,
                    name: item.name,
                    tier: item.tier
                }
            });

            const sortedNameEntryData = [...objectList].sort((a, b) => a.name.localeCompare(b.name));
            const sortedTierEntryData = [...sortedNameEntryData].sort((a, b) => a.tier - b.tier);

            dispatch({type: "GET_TEAMS_DATA_SUCCESS", payload: {data: teams.data, data2: sortedTierEntryData}});
        } catch (error) {
            dispatch({type: "TEAMS_DATA_FAILED"});
        }
    }
}

function postTeamsData(initData){
    return async(dispatch)=>{
        const data = await api.post(`/teams`, initData);
    }
}

function putTeamsData(teamListItem){
    return async(dispatch) => {
        const data = await api.put(`/teams/${teamListItem.id}`, teamListItem);
    }
}

function delTeamsData(teamListItem){
    return async(dispatch) => {
        const data = await api.delete(`/teams/${teamListItem.id}`, teamListItem);
    }
}

function updateEntryList(entryList){
    return async(dispatch) => {
        const update_data = []

        for(var i = 0; i < entryList.length; i++){
            update_data[i] = await api.put(`/entryList/${entryList[i].id}`, entryList[i]);
        }
    }
}

export const teamsAction = {getTeamsData, postTeamsData, putTeamsData, delTeamsData, updateEntryList};
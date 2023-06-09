import api from "../api";

function getTeamsData(){
    return async(dispatch)=>{
        try {
            dispatch({type: "TEAMS_DATA_REQUEST"});

            const entryList = await api.get(`/entryList`);

            const teams = await api.get(`/teams`);

            dispatch({type: "GET_TEAMS_DATA_SUCCESS", payload: {data: teams.data, data2: entryList}});
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

function initEntryList(list){
    return async(dispatch) => {
        console.log("list?", list);
        const getEntryListData = await api.get(`/entryList`);
        console.log("getEntryListData?", getEntryListData);
        
        const objectList = [];
        list.map((item, index) => {
            objectList[index] = {
                id: item.id,
                index: index,
                selected: false,
                backNum: item.backNum,
                name: item.name,
                tier: item.tier
            }
        });

        const sortedNameEntryData = [...objectList].sort((a, b) => a.name.localeCompare(b.name));
        const sortedTierEntryData = [...sortedNameEntryData].sort((a, b) => a.tier - b.tier);
        console.log("sortedTierEntryData??", sortedTierEntryData);

        if(getEntryListData.data[0] != null){
            const data = await api.put(`/entryList`, sortedTierEntryData);
            console.log("put!!", data);
        } else {
            const data = await api.post(`/entryList`, sortedTierEntryData);
            console.log("post!!", data);
        }

    }
}

export const teamsAction = {getTeamsData, postTeamsData, putTeamsData, delTeamsData, updateEntryList, initEntryList};
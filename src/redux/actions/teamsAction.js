import api from "../api";

function getTeamsData(){
    return async(dispatch)=>{
        try {
            dispatch({type: "TEAMS_DATA_REQUEST"});

            const entryList = await api.get(`/entryList`);

            const teams = await api.get(`/teams`);
            // console.log("teams.data?", teams.data);

            const objectList = [];
            
            entryList.data.map((item, index) => {
                objectList[index] = {
                    id: item.id,
                    index: index,
                    visible: item.visible,
                    backNum: item.backNum,
                    name: item.name,
                    tier: item.tier
                }});
                
            const sortedNameEntryData = [...objectList].sort((a, b) => a.name.localeCompare(b.name));
            const sortedTierEntryData = [...sortedNameEntryData].sort((a, b) => a.tier - b.tier);

            // console.log("sortedTierEntryData?", sortedTierEntryData);

            // await api.post(`/entryList`, sortedTierEntryData);

            dispatch({type: "GET_TEAMS_DATA_SUCCESS", payload: {data: teams.data, data2: sortedTierEntryData}});


        } catch (error) {
            dispatch({type: "TEAMS_DATA_FAILED"});
        }
    }
}

function postTeamsData(initData){
    return async(dispatch)=>{
        // console.log("initData?", initData);

        const data = await api.post(`/teams`, initData);

        // console.log("data?", data);

    }
}

function putTeamsData(teamListItem){
    return async(dispatch) => {
        // console.log("teamListItem??", teamListItem)

        const data = await api.put(`/teams/${teamListItem.id}`, teamListItem);

        // console.log("data?", data);
    }
}

function delTeamsData(teamListItem){
    return async(dispatch) => {
        // console.log("teamListItem??", teamListItem)

        const data = await api.delete(`/teams/${teamListItem.id}`, teamListItem);

        // console.log("data?", data);
    }
}

function updateEntryList(entryList){
    return async(dispatch) => {
        console.log("updateEntryList -> entryList??", entryList);

        // await api.put(`/entryList`, entryList);

        const update_data = []

        console.log("entryList.length?", entryList.length);

        for(var i = 0; i < entryList.length; i++){
            // console.log(`entryList[${i}]`, entryList[i]);
            update_data[i] = await api.put(`/entryList/${entryList[i].id}`, entryList[i]);
        }
    }
}

export const teamsAction = {getTeamsData, postTeamsData, putTeamsData, delTeamsData, updateEntryList};
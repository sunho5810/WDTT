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

function updateMembersData(dataList){
    return async(dispatch) => {
        try{
            dispatch({type: "POST_MEMBERS_DATA_REQUEST"});

            console.log("updateMembersData->data?", dataList);
            // console.log("updateMembersData->idx?", idx);

            // const data = await api.put(`/members/${idx}`, {
            //     id: dataList[idx].id,
            //     backNum: dataList[idx].backNum,
            //     name: dataList[idx].name,
            //     tier: dataList[idx].tier,
            //     games: dataList[idx].games,
            //     goals: dataList[idx].goals,
            //     assists: dataList[idx].assists,
            // });

            // const data = await api.put(`/members/`, dataList[0]);

            
            const data = await api.post("/members/", dataList);
            
            // const data = await api.put(`/members/posts/`, {
            //     id: dataList[0].id,
            //     backNum: dataList[0].backNum,
            //     name: dataList[0].name,
            //     tier: dataList[0].tier,
            //     games: dataList[0].games,
            //     goals: dataList[0].goals,
            //     assists: dataList[0].assists,
            // });

            console.log("post->data??", data);

            dispatch({type: "POST_MEMBERS_DATA_SUCCESS", payload: {data: data.data}});

        } catch (error) {
            dispatch({type: "POST_MEMBERS_DATA_FAILED"});
        }

        
    }
}

export const membersAction = {getMembersData, updateMembersData};
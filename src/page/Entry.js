import React, { useEffect, useState } from 'react'
import EntryMaker from '../components/EntryMaker'
import { useDispatch, useSelector } from 'react-redux';
import { membersAction } from '../redux/actions/membersAction';
import { ClipLoader } from 'react-spinners';
import { Button } from 'react-bootstrap';
import { teamsAction } from '../redux/actions/teamsAction';


/* 
    팀 리스트
    멤버들 리스트(선택되면 없어지게)
    팀 갯수는 셀렉트 박스? input=number? 둘중하나 선택
*/

const Entry = () => {

    const {membersList, loading} = useSelector((state) => state.members);
    console.log("membersList?????", membersList);

    const {teamsDataList, loading2} = useSelector((state) => state.teams);
    console.log("teamsDataList?????", teamsDataList);

    const [entryList, setEntryList] = useState([]);

    const [teamList, setTeamList] = useState([]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(membersAction.getMembersData());
        dispatch(teamsAction.getTeamsData());
    }, []);
    
    useEffect(() => {      
        if(loading == false){
            const copyArr2 = [...membersList];
            const sortedTier = [...copyArr2].sort((a, b) => a.tier - b.tier);
            setEntryList(sortedTier);
            console.log("entryList??", entryList);
        }
        if(loading2 == false){
            const copyArr3 = [...teamsDataList];
            setTeamList(copyArr3);
            console.log("teamList??", teamList);
        }
    }, [loading, loading2]);

    const clickAddEntryMaker = () => {
        const randomNum = Math.floor(Math.random() * ((999999 - 100000) + 1));

        const entryData = {
          id: randomNum,
          name: "",
          playerList: []
        }
    
        teamList[teamList.length] = entryData;
        setTeamList(teamList);

        dispatch(teamsAction.postTeamsData(entryData));
        dispatch(teamsAction.getTeamsData());
    }

    if(loading && loading2){
        return (
            <ClipLoader
                color="#0F1314"
                loading={loading2}
                size={150}
            />
        )
    } else {
        return (
            <div className='inner'>
                <div className='entryWrap'>
                    {/* <EntryMaker entryList={entryList} setEntryList={setEntryList} setTeamList={setTeamList}/> */}
                    {
                        teamList?.map((item, index) => (
                            <EntryMaker key={index} entryIdx={index} entryList={entryList} setEntryList={setEntryList} teamList={item} setTeamList={setTeamList}/>
                        ))
                    }
                </div>
                <Button variant='success' onClick={() => clickAddEntryMaker()}>추가</Button>
            </div>
          )
    }

  
}

export default Entry
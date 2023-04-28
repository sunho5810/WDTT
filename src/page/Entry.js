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

    const {teamsDataList, entryDataList, loading2} = useSelector((state) => state.teams);

    const [entryList, setEntryList] = useState([]);

    const [teamList, setTeamList] = useState([]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(teamsAction.getTeamsData());
    }, []);
    
    useEffect(() => {
        if(loading2 == false){

            const copyArr2 = [...entryDataList];
            const sortedTier = [...copyArr2].sort((a, b) => a.tier - b.tier);
            setEntryList(sortedTier);

            const copyArr3 = [...teamsDataList];
            setTeamList(copyArr3);
        }
    }, [loading2]);

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

    useEffect(() => {
        console.log("teamList!!!", teamList);
    }, [teamList])

    if(loading2){
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
                    {
                        teamList?.map((item, index) => (
                            <EntryMaker key={index} teamListItem={item} entryIdx={index} entryList={entryList} teamList={teamList} setTeamList={setTeamList}/>
                        ))
                    }
                </div>
                <Button variant='success' onClick={() => clickAddEntryMaker()}>추가</Button>
            </div>
          )
    }

  
}

export default Entry
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

    const {teamsDataList, entryList, loading2} = useSelector((state) => state.teams);

    const [teamList, setTeamList] = useState([]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(teamsAction.getTeamsData());
    }, []);
    
    useEffect(() => {
        if(loading2 == false){
            const copyArr3 = teamsDataList;
            setTeamList(copyArr3);
        }
    }, [loading2]);

    const clickAddEntryMaker = () => {
        const randomNum = Math.floor(Math.random() * ((999999 - 100000) + 1));

        const initData = {
          id: randomNum,
          teamName: "",
          personnel: 0,
          playerList: []
        }
    
        teamList[teamList.length] = initData;
        setTeamList(teamList);

        // console.log("teamList??", teamList);

        dispatch(teamsAction.postTeamsData(initData));
        dispatch(teamsAction.getTeamsData());
    }

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
                            <EntryMaker key={index} teamListItem={item} listLength={teamList.length} entryIdx={index}/>
                        ))
                    }
                </div>
                <Button variant='success' onClick={() => clickAddEntryMaker()}>추가</Button>
            </div>
          )
    }

  
}

export default Entry
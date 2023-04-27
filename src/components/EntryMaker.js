import React, { useEffect, useState } from 'react'
import PlayerBadge from './PlayerBadge'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { teamsAction } from '../redux/actions/teamsAction';

const EntryMaker = ({entryList, entryIdx, setEntryList, teamList, setTeamList}) => {

  console.log("entryList??", entryList);

  const [selectedList, setSelectedList] = useState([]);
  
  const [teamName, setTeamName] = useState("");

  const [teamsData, setTeamsData] = useState({
    id: teamList.id,
    name: teamList.name,
    playerList: teamList.playerList,
  });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("selectedList????", selectedList);
  // }, [selectedList]);


  const saveEntry = () => {
    console.log("selectedList????", selectedList);
    console.log("teamName??", teamName);

    // console.log("teamList?", teamList);

    // dispatch(teamsAction.postEntryData(entryData));
  }

  return (
    <div className='entryMaker'>
      <div className='entryMaker__teamName'>
        <input type='text' placeholder='teamName' onChange={(e) => setTeamName(e.target.value)}/>
      </div>
      <div className='entryMaker__cont'>
        <div className='entryMaker__players'>
          <ul className={`entryMaker__playersList entryMaker__playersList--${entryIdx}`}>
          </ul>
        </div>
        <div className='entryMaker__members'>
          <ul className={`entryMaker__membersList entryMaker__membersList--${entryIdx}`}>
            {
              entryList?.map((item, index) => (
                <PlayerBadge key={index} item={item} entryIdx={entryIdx} selectedList={selectedList} setSelectedList={setSelectedList}/>
              ))
            }
          </ul>
        </div>
        <div className='entryMaker__btns'>
          <Button variant='success' onClick={() => saveEntry()}>저장</Button>
          <Button variant='danger'>삭제</Button>
        </div>
      </div>
    </div>
  )
}

export default EntryMaker
import React, { useEffect, useState } from 'react'
import PlayerBadge from './PlayerBadge'
import { Button } from 'react-bootstrap'
import SelectedPlayerBadge from './SelectedPlayerBadge';

const EntryMaker = ({entryIdx, entryList, teamListItem, setTeamList, teamList}) => {

  const [selectedList, setSelectedList] = useState([]);

  // useEffect(() => {
  //   console.log("selectedList?", selectedList);
    
  // }, [selectedList]);

  return (
    <div className='entryMaker'>
      <div className='entryMaker__teamName'>
        <input type='text' placeholder='teamName' /* onChange={(e) => setTeamName(e.target.value)} *//>
      </div>
      <div className='entryMaker__cont'>
        <div className='entryMaker__players'>
          <ul className={`entryMaker__playersList entryMaker__playersList--${entryIdx}`}>
            {
              teamListItem.playerList?.map((item, index) => (
                <SelectedPlayerBadge key={index} item={item}/>
              ))
            }
          </ul>
        </div>
        <div className='entryMaker__members'>
          <ul className={`entryMaker__membersList entryMaker__membersList--${entryIdx}`}>
            {
              entryList?.map((item, index) => (
                <PlayerBadge key={index} item={item} entryIdx={entryIdx} teamList={teamList} teamListItem={teamListItem} setTeamList={setTeamList} selectedList={selectedList} setSelectedList={setSelectedList}/>
              ))
            }
          </ul>
        </div>
        <div className='entryMaker__btns'>
          {/* <Button variant='success' onClick={() => saveEntry()}>저장</Button> */}
          <Button variant='danger'>삭제</Button>
        </div>
      </div>
    </div>
  )
}

export default EntryMaker
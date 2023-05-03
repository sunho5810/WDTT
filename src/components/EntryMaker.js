import React, { useEffect, useState } from "react";
import PlayerBadge from "./PlayerBadge";
import { Button } from "react-bootstrap";
import SelectedPlayerBadge from "./SelectedPlayerBadge";
import { useDispatch, useSelector } from "react-redux";
import { teamsAction } from "../redux/actions/teamsAction";

const EntryMaker = ({teamListItem, entryIdx}) => {

  const {teamsDataList, entryList} = useSelector((state) => state.teams);

  const [selectedList, setSelectedList] = useState([...teamListItem.playerList]);

  const [personnel, setPersonnel] = useState(teamListItem.personnel);

  const [teamName, setTeamName] = useState(teamListItem.teamName);

  const dispatch = useDispatch();

  const saveEntry = () => {
    teamListItem = {
      id: teamListItem.id,
      teamName: teamName,
      personnel: personnel,
      playerList: selectedList
    }

    dispatch(teamsAction.putTeamsData(teamListItem));
    dispatch(teamsAction.updateEntryList(entryList));
  }

  const delEntry = () => {
    console.log("delEntry -> teamListItem.teamName?", teamListItem.teamName);
    teamsDataList.splice(entryIdx, 1);
    console.log("teamListItem.playerList?", teamListItem.playerList)
    entryList.map((entryList) => {
      teamListItem.playerList.map((item) => {if(entryList.id === item.id){console.log("true!!"); entryList.visible = true}})
    });

    console.log("delEntry -> entryList", entryList);
    dispatch(teamsAction.updateEntryList(entryList));
    dispatch(teamsAction.delTeamsData(teamListItem));
    dispatch(teamsAction.getTeamsData());
  }

  return (
    <div className="entryMaker">
      <div className="entryMaker__teamName">
        <input type="text" placeholder="팀 이름을 입력하세요" defaultValue={teamListItem.teamName} onChange={(e) => setTeamName(e.target.value)}/>
        <span className="count">인원 수 : {personnel}</span>
      </div>
      <div className="entryMaker__cont">
        <div className="entryMaker__players">
          <ul className={`entryMaker__playersList entryMaker__playersList--${entryIdx}`}>
            {
              teamListItem.playerList != [] ?
              selectedList?.map((item, index) => (
                <SelectedPlayerBadge key={index} item={item} selectedList={selectedList} personnel={personnel} setPersonnel={setPersonnel}/>
              ))
              :
              teamListItem.playerList?.map((item, index) => (
                <SelectedPlayerBadge key={index} item={item} selectedList={teamListItem.playerList} personnel={personnel} setPersonnel={setPersonnel}/>
              ))
            }
          </ul>
        </div>
        <div className="entryMaker__members">
          <ul className={`entryMaker__membersList entryMaker__membersList--${entryIdx}`} >
            {
              entryList?.map((item, index) => item.selected == false ? (
                <PlayerBadge
                  key={index}
                  index={index}
                  item={item}
                  selectedList={selectedList}
                  setSelectedList={setSelectedList}
                  personnel={personnel}
                  setPersonnel={setPersonnel}
                />
              ) : "")
            }
          </ul>
        </div>
        <div className="entryMaker__btns">
          <Button variant='success' onClick={() => saveEntry()}>저장</Button>
          <Button variant="danger" onClick={() => delEntry()}>삭제</Button>
        </div>
      </div>
    </div>
  );
};

export default EntryMaker;

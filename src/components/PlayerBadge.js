import React, { useEffect, useState } from 'react'

const PlayerBadge = ({item, entryIdx, selectedList, setSelectedList, teamListItem, setTeamList, teamList}) => {

    const clickBadge = () => {
        const tempData = {
            id: item.id,
            backNum: item.backNum,
            name: item.name,
            tier: item.tier
        }

        selectedList[selectedList.length] = tempData;
        setSelectedList(selectedList);
        console.log("selectedList??", selectedList);

        teamListItem.playerList = selectedList;
        setTeamList({...teamListItem, playerList: teamListItem.playerList});
        console.log("teamList?", teamList);
        console.log("teamListItem?", teamListItem);
    }

  return (
    <li className={`playerBadge playerBadge--${item.id}`} onClick={() => clickBadge()}>
        {item?.backNum} / {item?.name} / {item?.tier} {/* <span onClick={(e)=>delBadge(e)}>x</span> */}
    </li>
  )
}

export default PlayerBadge
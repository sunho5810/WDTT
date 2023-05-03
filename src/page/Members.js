import React, { useEffect, useState } from 'react'
import MemberCard from '../components/MemberCard'
import { useDispatch, useSelector } from 'react-redux'
import { membersAction } from '../redux/actions/membersAction';
import { ClipLoader } from 'react-spinners';
import { Button } from 'react-bootstrap';
import { teamsAction } from '../redux/actions/teamsAction';

const Members = () => {

    const {membersList, loading} = useSelector((state) => state.members);
    const auth = useSelector((state) => state.auth.authenticate);

    const [tempList, setTempList] = useState([]);

    const [entryTempList, setEntryTempList] = useState([]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(membersAction.getMembersData());
    }, []);
    
    useEffect(() => {        
        if(loading == false){
            const copyArr = [...membersList];
            const sortedName = [...copyArr].sort((a, b) => a.name.localeCompare(b.name));
            setTempList(sortedName);
        }
    }, [loading])

    const clickUpdateMembersData = () => {
        console.log("tempList??", tempList);
        dispatch(membersAction.updateMembersData(tempList));
    }

    const clickAddMembersData = () => {
        const randomNum = Math.floor(Math.random() * ((9999 - 1000) + 1));

        const emptyObject = {
            id: randomNum,
            backNum: 0,
            checkedEntry: false,
            name: "",
            tier: 0,
            games: 0,
            late: 0,
            goals: 0,
            assists: 0,
        }
        tempList[tempList.length] = emptyObject;
        setTempList(tempList);

        dispatch(membersAction.addMembersData(randomNum, emptyObject));
        dispatch(membersAction.getMembersData());
    }

    const sortData = (dataName) => {
        const sortedData = [...tempList].sort((a, b) => dataName == "name" ? a[dataName].localeCompare(b[dataName]) : a[dataName] - b[dataName]);
        setTempList(sortedData);
    }

    const allCheckFunc = (e) => {
        const checkBox = document.querySelectorAll(".chk-checkEntry");
        if(e.target.checked){
            for(var i = 0; i < checkBox.length; i++){
                if(!checkBox[i].checked){
                    checkBox[i].click();
                }
            }
        } else {
            for(var i = 0; i < checkBox.length; i++){
                if(checkBox[i].checked){
                    checkBox[i].click();
                }
            }
        }
    }

    const clickCreateEntryList = () => {

        entryTempList.splice(0, entryTempList.length);
        setEntryTempList(entryTempList);

        for(var i = 0; i < tempList.length; i++){
            if(tempList[i].checkedEntry == true){
                entryTempList[entryTempList.length] = tempList[i];
                setEntryTempList(entryTempList);
            }
        }

        console.log("entryTempList", entryTempList);
        dispatch(membersAction.updateMembersData(tempList));
        dispatch(teamsAction.initEntryList(entryTempList));
    }

    if(loading){
        return (
            <ClipLoader
                color="#0F1314"
                loading={loading}
                size={150}
            />
        )
    } else {
        return (
            <div className='inner'>
                <table className='tbl'>
                    <colgroup>
                        {auth && <col width="3%"/>}
                        <col width="3%"/>
                        <col width="5%"/>
                        <col width="10%"/>
                        <col width="5%"/>
                        <col width="5%"/>
                        <col width="5%"/>
                        <col width="5%"/>
                        <col width="5%"/>
                        {auth && <col width="5%"/>}
                    </colgroup>
                    <thead>
                        <tr>
                            {auth && <th><input type='checkbox' id="allCheck" onChange={(e) => allCheckFunc(e)}/></th>}
                            <th>No.</th>
                            <th onClick={() => sortData("backNum")}>등번호</th>
                            <th onClick={() => sortData("name")}>이름</th>
                            <th onClick={() => sortData("tier")}>티어</th>
                            <th onClick={() => sortData("games")}>게임 수</th>
                            <th onClick={() => sortData("late")}>지각</th>
                            <th onClick={() => sortData("goals")}>골</th>
                            <th onClick={() => sortData("assists")}>어시스트</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tempList?.map((item, index) => (
                                < MemberCard
                                    key = {item.id}
                                    itemIdx = {index}
                                    item = {item}
                                    tempList = {tempList}
                                    setTempList = {setTempList}
                                    entryTempList = {entryTempList}
                                    setEntryTempList = {setEntryTempList}
                                />
                            ))
                        }
                    </tbody>
                </table>
                {
                    auth && (
                        <div>
                            <Button variant='dark' onClick={() => {clickUpdateMembersData()}}>수정</Button>
                            <Button variant='success' onClick={() => {clickAddMembersData()}}>추가</Button>
                            <Button variant='primary' onClick={() => {clickCreateEntryList()}}>엔트리 생성</Button>
                        </div>
                    )
                }
                
            </div>
        )
    }
}

export default Members
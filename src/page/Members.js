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

    useEffect(() => {        
        console.log("auth?", auth)
    }, [auth])

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

    const allCheck = (e) => {
        const checkBox = document.querySelectorAll("tbody td input[type='checkbox']");
        if(e.target.checked){
            for(var i = 0; i < checkBox.length; i++){
                // console.log("checkBox?", checkBox[i].checked);
                checkBox[i].checked = true;
                checkBox[i].dispatchEvent(new Event('change'));
                // console.log(checkBox[i].dispatchEvent(new Event('change')));
            }
        } else {
            for(var i = 0; i < checkBox.length; i++){
                // console.log("checkBox?", checkBox[i].checked);
                checkBox[i].checked = false;
                checkBox[i].dispatchEvent(new Event('change'));
            }
        }
    }

    const clickCreateEntryList = () => {
        console.log("clickCreateEntryList!!");

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
                        <col width="5%"/>
                        <col width="10%"/>
                        <col width="15%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                    </colgroup>
                    <thead>
                        <tr>
                            {auth && <th><input type='checkbox' onChange={(e) => allCheck(e)}/></th>}
                            <th>No.</th>
                            <th onClick={() => sortData("backNum")}>등번호</th>
                            <th onClick={() => sortData("name")}>이름</th>
                            <th onClick={() => sortData("tier")}>티어</th>
                            <th onClick={() => sortData("games")}>게임 수</th>
                            <th onClick={() => sortData("late")}>지각</th>
                            <th onClick={() => sortData("goals")}>골</th>
                            <th onClick={() => sortData("assists")}>어시스트</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tempList?.map((item, index) => (
                                <MemberCard key={item.id} itemIdx={index} item={item} tempList={tempList} setTempList={setTempList} entryTempList={entryTempList} setEntryTempList={setEntryTempList}/>
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
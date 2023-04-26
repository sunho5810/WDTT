import React, { useEffect, useState } from 'react'
import MemberCard from '../components/MemberCard'
import { useDispatch, useSelector } from 'react-redux'
import { membersAction } from '../redux/actions/membersAction';
import { ClipLoader } from 'react-spinners';
import { Button } from 'react-bootstrap';

const Members = () => {

    const {membersList, loading} = useSelector((state) => state.members);
    const auth = useSelector((state) => state.auth);

    const [tempList, setTempList] = useState([]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(membersAction.getMembersData());
    }, []);
    
    useEffect(() => {        
        if(loading == false){
            const copyArr = [...membersList];
            setTempList(copyArr);
        }
    }, [loading])

    useEffect(() => {        
        console.log("auth?", auth)
    }, [auth])

    const clickUpdateMembersData = () => {
        dispatch(membersAction.updateMembersData(tempList));
    }

    const clickAddMembersData = () => {
        const randomNum = Math.floor(Math.random() * ((9999 - 1000) + 1));
        console.log("randomNum?", randomNum);

        const emptyObject = {
            id: randomNum,
            backNum: 0,
            name: "",
            tier: 0,
            games: 0,
            goals: 0,
            assists: 0
        }
        tempList[tempList.length] = emptyObject;
        setTempList(tempList);
        console.log("??", tempList);

        dispatch(membersAction.addMembersData(randomNum, emptyObject));
        dispatch(membersAction.getMembersData());
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
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="15%"/>
                        <col width="15%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>등번호</th>
                            <th>이름</th>
                            <th>티어</th>
                            <th>게임 수</th>
                            <th>골</th>
                            <th>어시스트</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            membersList?.map((item, index) => (
                                <MemberCard key={item.id} itemIdx={index} item={item} tempList={tempList} setTempList={setTempList}/>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <Button variant='dark' onClick={() => {clickUpdateMembersData()}}>수정</Button>
                    <Button variant='success' onClick={() => {clickAddMembersData()}}>추가</Button>
                </div>
            </div>
        )
    }
}

export default Members
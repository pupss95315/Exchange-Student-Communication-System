import React from 'react';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import { Container, Modal } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { useQuery, useMutation } from '@apollo/client';
import {
    USER_QUERY,
    UPDATE_USER_MUTATION
} from '../graphql';

const InfoPage = props => {
    const { match } = props;
    let {group, id} = match.params;
    
    const [infoList, setInfoList] = useState([]);
    const [show, setShow] = useState(false);

    // Mapping DB data
    const collegeMapping = {
      "C1": "文學院",
      "C2": "理學院",
      "C3": "社科院",
      "C4": "醫學院",
      "C5": "工學院",
      "C6": "生農學院",
      "C7": "管院",
      "C8": "公衛學院",
      "C9": "電資學院",
      "CA": "法學院",
      "CB": "生科院"
    }

    const isRegisteredMapping = {
      true: "報到",
      false: "放棄"
    }

    const groupMapping = {
      "GENERAL": "一般組",
      "FRENCH": "法文組",
      "JAPANESE": "日文組",
      "SPANISH": "西文組",
      "KOREAN": "韓文組",
      "GERMAN": "德文組",
      "CHINESE": "中文組"
    }
    
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);
    const { loading, error, data } = useQuery(USER_QUERY, { variables: {group: group}});

    useEffect(() => {
      if(data){
        console.log(data.users)
        var users = JSON.parse(JSON.stringify(data.users))
        var curList = users.map(function(user){
          var newUser = user
          if(user.college){
            newUser = {
              ...user, 
              college: collegeMapping[user.college]}
          }
          if(user.isRegistered){
            newUser = {
              ...user, 
              isRegistered: isRegisteredMapping[user.isRegistered]}
          }
          if(user.college && user.isRegistered){
            newUser = {
              ...user, 
              college: collegeMapping[user.college],
              isRegistered: isRegisteredMapping[user.isRegistered]}
          }
          
          return newUser
        });
        setInfoList(curList)
      }
    }, [data])

    const onAfterSaveCell = async (oldValue, newValue, row, cellName) => {
        var cellName = cellName.dataField
        var update
        var msg = ""
        if(cellName === 'GPA'){
          msg = await updateUser({ variables: {UID: id, data: {GPA: Number(newValue)}} });
        }
        // else if(cellName === 'GPA'){
        //   await updateUser({ variables: {UID: id, data: {GPA: Number(newValue)}} });
        // }
        else if(cellName === 'college'){
          update = Object.keys(collegeMapping).find(key => collegeMapping[key] === newValue);
          msg = await updateUser({ variables: {UID: id, data: {college: update}} });
        }
        else if(cellName === 'school'){
          msg = await updateUser({ variables: {UID: id, data: {school: newValue}} });
        }
        else if(cellName === 'duration'){
          msg = await updateUser({ variables: {UID: id, data: {duration: newValue}} });
        }
        else if(cellName === 'isRegistered'){
          update = Object.keys(isRegisteredMapping).find(key => isRegisteredMapping[key] === newValue);
          msg = await updateUser({ variables: {UID: id, data: {isRegistered: update === "true"}} });
        }
        else if(cellName === 'languageExam'){
          msg = await updateUser({ variables: {UID: id, data: {languageExam: newValue}} });
        }
        else if(cellName === 'apply_list'){
          msg = await updateUser({ variables: {UID: id, data: {apply_list: newValue}} });
        }
        console.log(msg)
        if(msg.data.updateUser === "success"){
          setShow(true)
        }
          
    }

    const nonEditableRows = () => {
      return infoList && infoList.filter((title) => {
        return title.user_id !== id;})
      .map(title => title.user_id)
    }

    const cellEdit = cellEditFactory( {
        mode: 'click',
        blurToSave: true,
        nonEditableRows: nonEditableRows,
        afterSaveCell: onAfterSaveCell  
    });

    const showAlert = (
      <Modal
          size="sm"
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
      >
          <Modal.Header closeButton>資料更改成功 !</Modal.Header>
      </Modal>
    )

    const columns = [{
        dataField: 'user_id',
        text: '序號',
        active: false,
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns'
      }, {
        dataField: 'GPA',
        text: '成績',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns'
      }, 
      // {
      //   dataField: 'GPA2',
      //   text: '複查成績',
      //   headerAlign: 'center',
      //   align: 'center',
      //   classes: 'table__columns'
      // }, 
      {
        dataField: 'college',
        text: '學院',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns',
        editor: {
            type: Type.SELECT,
            options: [{
              value: '文學院',
              label: '文學院'
            }, {
              value: '理學院',
              label: '理學院'
            }, {
              value: '醫學院',
              label: '醫學院'
            }, {
              value: '社科院',
              label: '社科院'
            }, {
              value: '工學院',
              label: '工學院'
            }, {
                value: '生農學院',
                label: '生農學院'
            }, {
                value: '管理學院',
                label: '管理學院'
            },{
              value: '公衛學院',
              label: '公衛學院'
            },{
              value: '電資學院',
              label: '電資學院'
            },{
              value: '法學院',
              label: '法學院'
            },{
              value: '生科院',
              label: '生科院'
            }]
        }
      }, {
        dataField: 'school',
        text: '錄取學校',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns'
      }, {
        dataField: 'isRegistered',
        text: '報到/放棄',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns',
        editor: {
            type: Type.SELECT,
            options: [{
              value: '報到',
              label: '報到'
            }, {
              value: '放棄',
              label: '放棄'
            }]
        }
      },{
        dataField: 'duration',
        text: '預計交換期間',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns',
        editor: {
            type: Type.SELECT,
            options: [{
              value: '上學期',
              label: '上學期'
            }, {
              value: '下學期',
              label: '下學期'
            }, {
              value: '一學年',
              label: '一學年'
            }]
        }
      }, {
        dataField: 'languageExam',
        text: '語言檢定',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns'
      }, 
      {
        dataField: 'apply_list',
        text: '預計志願',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns'
      }
    ];
    
    return(
      <>
        <Header />
        <Container>
          {showAlert}
          <div>
              <h1 style={{fontWeight: "bold"}} className="mb-3">{groupMapping[group]}志願表</h1>
              <h6 style={{color:"#463F3A"}} className="mb-4">點選自己的資料可以進行修改，祝大家都可以申請到喜歡的學校！</h6>
          </div>
          <BootstrapTable 
              keyField="user_id" 
              data={infoList} 
              columns={columns}
              cellEdit={cellEdit}
              headerClasses="table__header"
              hover
              striped
              bordered={ false }
          >
          </BootstrapTable >
        </Container>
      </>
    )
}

export default InfoPage;
import React from 'react';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import { Container, Modal } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { useQuery, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
    USER_QUERY,
    SCHOOL_QUERY,
    UPDATE_USER_MUTATION
} from '../graphql';

const InfoPage = props => {
    // const { match } = props;
    // let {group, id} = match.params;
    let group = localStorage.getItem("group");
    let id = localStorage.getItem("id");

    const [infoList, setInfoList] = useState([]);
    const [show, setShow] = useState(false);

    const turnListToDict = (l) => {
      var d = []
      for(var i = 0; i < l.length; i++){
        d.push({value : l[i], label : l[i]})
      }
      return d
    }

    const getApplyListByUserId = (users, user_id) => {
      var user = users.filter(obj => obj.user_id === user_id);
      return user[0]['apply_list']
    }
    
    // List of Colleges
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
    
    const college_list = Object.values(collegeMapping)
    const college_dict = turnListToDict(college_list)

    // List of isRegistered
    const isRegisteredMapping = {
      true: "報到",
      false: "放棄"
    }
    const isRegistered_list = Object.values(isRegisteredMapping)
    const isRegistered_dict = turnListToDict(isRegistered_list)

    // List of Groups
    const groupMapping = {
      "GENERAL": "一般組",
      "FRENCH": "法語組",
      "JAPANESE": "日語組",
      "SPANISH": "西語組",
      "KOREAN": "韓語組",
      "GERMAN": "德語組",
      "CHINESE": "中語組"
    }
    const group_list = Object.values(groupMapping)
    const group_dict = turnListToDict(group_list)

    // List of Duration
    const duration_list = ["上學期", "下學期", "一學年"];
    const duration_dict = turnListToDict(duration_list)

    
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);
    const { loading, error, data } = useQuery(USER_QUERY, { variables: {group: group}});
    const { loading: school_loading, error:school_error, data:school_data } = useQuery(SCHOOL_QUERY, { variables: {group: group}});

    var school_list;
    var school_dict;
    if(school_data){
      school_list = school_data.schools.map(s => s.school_name)
      school_dict = turnListToDict(school_list)
    }

    console.log(school_dict)

    
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
          
          newUser["apply_list1"] = user.apply_list[0]
          newUser["apply_list2"] = user.apply_list[1]
          newUser["apply_list3"] = user.apply_list[2]

          return newUser
        });
        setInfoList(curList)
      }
    }, [data])

    const onAfterSaveCell = async (oldValue, newValue, row, cellName) => {
        var cellName = cellName.dataField ;
        var update ;
        var msg = "" ;

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
        // else if(cellName === 'school'){
        //   msg = await updateUser({ variables: {UID: id, data: {school: newValue}} });
        // }
        else if(cellName === 'duration'){
          msg = await updateUser({ variables: {UID: id, data: {duration: newValue}} });
        }
        else if(cellName === 'isRegistered'){
          update = Object.keys(isRegisteredMapping).find(key => isRegisteredMapping[key] === newValue);
          msg = await updateUser({ variables: {UID: id, data: {isRegistered: update === true}} });
        }
        else if(cellName === 'languageExam'){
          msg = await updateUser({ variables: {UID: id, data: {languageExam: newValue}} });
        }
        else if(cellName === 'apply_list1'){
          var new_apply_list = getApplyListByUserId(data.users, id);
          new_apply_list = [... new_apply_list]
          new_apply_list.splice(0, 1, newValue);
          msg = await updateUser({ variables: {UID: id, data: {apply_list: new_apply_list}} });
        }
        else if(cellName === 'apply_list2'){
          var new_apply_list = getApplyListByUserId(data.users, id);
          new_apply_list = [... new_apply_list]
          new_apply_list.splice(1, 1, newValue);
          msg = await updateUser({ variables: {UID: id, data: {apply_list: new_apply_list}} });
        }
        else if(cellName === 'apply_list3'){
          var new_apply_list = getApplyListByUserId(data.users, id);
          new_apply_list = [... new_apply_list]
          new_apply_list.splice(2, 1, newValue);
          msg = await updateUser({ variables: {UID: id, data: {apply_list: new_apply_list}} });
        }
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
        classes: 'table__columns',
        sort: true
      }, {
        dataField: 'GPA',
        text: '成績',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns',
        sort: true
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
        sort: true,
        editor: {
            type: Type.SELECT,
            options: college_dict
        }
      }, 
      // {
      //   dataField: 'school',
      //   text: '錄取學校',
      //   headerAlign: 'center',
      //   align: 'center',
      //   classes: 'table__columns',
      //   sort: true
      // }, 
      {
        dataField: 'isRegistered',
        text: '是否報到',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns',
        sort: true,
        editor: {
          type: Type.SELECT,
          options: isRegistered_dict
        }
      },{
        dataField: 'duration',
        text: '預計期間',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns',
        sort: true,
        editor: {
            type: Type.SELECT,
            options: duration_dict
        }
      }, {
        dataField: 'languageExam',
        text: '語言檢定',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns',
        sort: true
      }, 
      {
        dataField: 'apply_list1',
        text: '志願一',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns',
        sort: true,
        editor: {
          type: Type.SELECT,
          options: school_dict
        }
      },
      {
        dataField: 'apply_list2',
        text: '志願二',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns',
        sort: true,
        editor: {
          type: Type.SELECT,
          options: school_dict
        }
      },
      {
        dataField: 'apply_list3',
        text: '志願三',
        headerAlign: 'center',
        align: 'center',
        classes: 'table__columns',
        sort: true,
        editor: {
          type: Type.SELECT,
          options: school_dict
        }
      }
    ];

    return(
      <>
        {
          localStorage.getItem('isLogin')?
          (<>
              <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
                crossorigin="anonymous"
              ></link>
              <Header />
              <Container>
                {showAlert}
                <div>
                    <h1 style={{fontWeight: "bold"}} className="mb-3">{groupMapping[group]}志願表</h1>
                    <h6 style={{color:"#463F3A"}} className="mb-4">點選自己的資料可以進行修改，祝大家都可以申請到喜歡的學校！</h6>
                </div>
                {
                  school_data? 
                  <>
                    <BootstrapTable 
                        bootstrap4
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
                  </>:null
                }
              </Container>
            </>):
            <Redirect push to="/"/>
        }
      </>
    )
}

export default InfoPage;
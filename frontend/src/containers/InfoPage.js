import { useState } from 'react';
import Header from "../components/Header";
import { Container, Modal } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { useQuery, useMutation } from '@apollo/client';
import {
    USER_QUERY,
    UPDATE_USER_MUTATION
} from '../graphql';

// const infoList = [
//     { UID: "G10", GPA: 3.5, School: "", College: "管理學院", Duration:"上學期"}
// ];


const InfoPage = (props) => {
    const [infoList, setInfoList] = useState([]);

    // Mutation function
    // const [updateUser] = useMutation(UPDATE_USER_MUTATION);

    // Query function
    const { loading, error, data, subscribeToMore } = useQuery(USER_QUERY);
    console.log(data)

    // infoList = data;
    
    const [show, setShow] = useState(false);

    const onAfterSaveCell = (oldValue, newValue, row, cellName) => {
        //updateUserInfo(UID, cellName, newValue);
        setShow(true)
    }

    const nonEditableRows = () => {
      return infoList && infoList.filter((title) => {
        return title.UID !== "G10";})
        .map(title => title.UID)
    }

    const cellEdit = cellEditFactory( {
        mode: 'click',
        blurToSave: true,
        nonEditableRows: nonEditableRows,
        //beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
        afterSaveCell: onAfterSaveCell  // a hook for after saving cell
    });
    
    

    /* API functions*/
    /*
    const getUserInfo = async () => {
      const {
        data: { userInfo },
      } = await axios.get('/api/getUserInfo');
      setInfoList(userInfo);
    };

    const updateUserInfo = async (UID, updateType, updateValue) => {
      const {
        data: { msg },
      } = await axios.post('/api/updateUserInfo', {
        UID, 
        updateType, 
        updateValue
      });
    };
    */

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
        dataField: 'UID',
        text: '序號',
        active: false
      }, {
        dataField: 'GPA',
        text: '成績'
      }, {
        dataField: 'GPA2',
        text: '複查成績'
      }, 
      {
        dataField: 'College',
        text: '學院',
        editor: {
            type: Type.SELECT,
            options: [{
              value: '理學院',
              label: '理學院'
            }, {
              value: '生物',
              label: '生物'
            }, {
              value: '醫學院',
              label: '醫學院'
            }, {
              value: '工學院',
              label: '工學院'
            }, {
              value: '電資學院',
              label: '電資學院'
            }, {
                value: '社科院',
                label: '社科院'
            }, {
                value: '管理學院',
                label: '管理學院'
            }]
        }
      }, {
        dataField: 'School',
        text: '錄取學校'
      }, {
        dataField: 'isRegistered',
        text: '報到/放棄',
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
        dataField: 'Duration',
        text: '預計交換期間',
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
        dataField: 'LanguageExam',
        text: '語言檢定'
      }, {
        dataField: 'isCollegeExchange',
        text: '院級交換'
      }, {
        dataField: 'Application',
        text: '預計志願'
      }];
    return(
      <>
        <Container>
          {showAlert}
          <div>
              <h3 style={{fontWeight: "bold"}} className="mb-3">法文組志願表</h3>
              <h6 style={{color:"grey", fontWeight: "lighter"}} className="mb-4">祝大家都可以申請到喜歡的學校！</h6>
          </div>
          <BootstrapTable 
              keyField="UID" 
              data={infoList} 
              columns={columns}
              cellEdit={cellEdit}
          />
        </Container>
      </>
    )
}

export default InfoPage;
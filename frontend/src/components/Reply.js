import { Accordion, Card, Button } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { useMutation } from '@apollo/client';
import {
    DELETE_REPLY_MUTATION,
    UPDATE_REPLY_MUTATION
} from '../graphql';

const Reply = ({
    key,
    UID,
    reply,
    editReply,
    isEdit,
    setShow,
    setMsg}) => {

    const [deleteReply] = useMutation(DELETE_REPLY_MUTATION);
    const [updateReply] = useMutation(UPDATE_REPLY_MUTATION);

    const handleDeleteReply = async () => {
        const res = await deleteReply({ variables: { RID: reply.id } })
        if(res.deleteReply === "success"){
            setMsg("回覆新增成功")
            setShow(true)
        }
      }

    return(
        <Accordion.Collapse eventKey="0">
            <Card.Body className="d-flex align-items-center justify-content-between">
                <div>    
                    <AccountCircleIcon className="mr-2" style={{ fontSize:"45", color:"#E0E0E0" }}></AccountCircleIcon>
                    <span style={{fontSize:"18px"}}>{reply.content}</span>
                </div>
                {
                    reply.author.user_id === UID? 
                    (<div>
                        <Button variant="outline-secondary" size="sm" onClick={() => editReply(UID)}>編輯</Button>
                        <a className='ml-3' style={{color: "grey"}} variant="light" onClick={()=>handleDeleteReply()}>
                            <HighlightOffOutlinedIcon style={{fontSize: "30px"}}></HighlightOffOutlinedIcon>
                        </a>
                    </div>):
                    null
                }
            </Card.Body>
        </Accordion.Collapse>
    )
}

export default Reply;
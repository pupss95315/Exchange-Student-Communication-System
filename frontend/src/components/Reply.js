import { Accordion, Card, Button } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const Reply = ({
    key,
    id,
    reply,
    deleteReply,
    editReply,
    updateReply,
    isEdit}) => {
    return(
        <Accordion.Collapse eventKey="0">
            <Card.Body className="d-flex align-items-center justify-content-between">
                <div>    
                    <AccountCircleIcon className="mr-2" style={{ fontSize:"45", color:"#E0E0E0" }}></AccountCircleIcon>
                    <span style={{fontSize:"18px"}}>{reply.content}</span>
                </div>
                <div>
                    <Button variant="outline-secondary" size="sm" onClick={() => editReply(id)}>編輯</Button>
                    <a className='ml-3' style={{color: "grey"}}variant="light" onClick={() => deleteReply(id)}>
                        <HighlightOffOutlinedIcon style={{fontSize: "30px"}}></HighlightOffOutlinedIcon>
                    </a>
                </div>
            </Card.Body>
        </Accordion.Collapse>
    )
}

export default Reply;
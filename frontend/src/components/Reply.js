import { Accordion, Card } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
            <Card.Body>
                <AccountCircleIcon color="action" className="mr-2" style={{ fontSize:"35" }}></AccountCircleIcon>
                {reply}
            </Card.Body>
        </Accordion.Collapse>
    )
}

export default Reply;
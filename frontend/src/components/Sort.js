import { Form } from 'react-bootstrap';
import SortIcon from '@material-ui/icons/Sort';
const Sort = ({sort, setSort}) => {
    return(
        <div md="7" className="d-flex align-items-center justify-content-end"> 
            <h5 style={{ width: '80%', fontSize: "18px", color:"grey", fontWeight: "lighter"}}>排序依</h5>
            <Form.Control as="select" value={sort} className="ml-3 mb-2" style={{ width: '20%', fontSize: "18px" }} onChange={e => setSort(e.target.value)}>
                <option value="最新">最新</option>
                <option value="最受歡迎">關注</option>
                <option value="最多人回覆">回覆</option>
            </Form.Control>
        </div>
    )
}

export default Sort;
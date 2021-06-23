import React, { useState } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import NativeSelect from '@material-ui/core/NativeSelect';
// import FormControl from '@material-ui/core/FormControl';
const SearchBar = (props) => {
    const [replyValue, setReplyValue] = useState("");
    const [queryType, setQueryType] = useState("");
    const [queryValue, setQueryValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!replyValue) return;
        props.addReply(replyValue);
        setReplyValue("");
        
    };

    return (
    <>
        <Form.Row className="mt-3 mb-3 align-items-center justify-content-center">
            {/* <div key={`inline`} className="mb-3">
           
                <Form.Check inline label="依序號" name="condition" type='radio' id={`inline-1`} />
                <Form.Check inline label="依內容" name="condition" type='radio' id={`inline-2`} />
            </div> */}
            <Col md="3">
                <div className="d-flex align-items-end justify-content-center "> 
                    <h6 style={{ width: '30%' }}>搜尋依</h6>
                    <Form.Control as="select" style={{ width: '20%' }}>
                        <option value="內容">內容</option>
                        <option value="序號">序號</option>
                    </Form.Control>
                </div>
            </Col>
            <Col md="9" className="d-flex">
                <Form.Control placeholder="搜尋" />
                <Button type="submit"  variant="secondary" size="sm" ><SearchIcon></SearchIcon></Button>    
            </Col>
        </Form.Row>
    </>
    )
}

export default SearchBar;
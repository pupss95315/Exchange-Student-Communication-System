import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';

const CommentForm = ({addCmt}) => {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        // addCmt({ variables: {
        //         author: author,
        //         content: value,
        //     }
        // });
        setValue("");
    };

    return (
        <Form.Row className="mt-3 mb-4">
            <Col className="d-flex">
                <Form.Control value={value} onChange={ e => setValue(e.target.value)} placeholder="新增留言" />
                <Button  onClick={ e => handleSubmit(e) } type="submit"  variant="secondary" size="sm">
                    <AddIcon></AddIcon>
                </Button>
            </Col>
        </Form.Row>
    )
}

export default CommentForm;
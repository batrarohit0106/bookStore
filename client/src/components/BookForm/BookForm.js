import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Card, Form, Input, Typography, Button, Select} from "antd"
import FileBase64 from "react-file-base64"
import styles from './styles'
import {createBook, editBook} from '../../actions/books'
import { Link } from "react-router-dom"

const {Title} = Typography;

function BookForm({ selectedId, setSelectedId }){
  const book = useSelector((state)=> selectedId ? state.books.find(book => book.id === selectedId): null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?.id;

  const onSubmit = (formValues) => {
    console.log(selectedId)
    selectedId ?
    dispatch(editBook(selectedId, {...formValues, userId})) :
    dispatch(createBook({...formValues, userId}));
    reset();
  };

  useEffect(()=>{
    if(book){
      form.setFieldsValue(book);
    }
  }, [book, form]);

  const reset = () => {
    form.resetFields();
    setSelectedId(null);
  }
if(!user){
  return (
    <Card style={styles.formCard}>
      <Title level={4}>
        <span style={styles.formTitle}>
          Welcome to The Bibliophile's Corner!
        </span><br/>
        Please <Link to="/authform">login</Link> or {" "}
        <Link to="/authform">register</Link> to add a book.
      </Title>
    </Card>
  );
}

  return (
    <Card
      style = {styles.formCard}
      title={
        <Title level={4} style={styles.formTitle}>
          {selectedId ? "Edit" : "Add"} Book
        </Title>
      }
    >
      <Form
        form={form}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        layout='horizontol'
        size="middle"
        onFinish={onSubmit}
      >
        
        <Form.Item name="title" label="Title" style={styles.label} rules={[{required: true}]}>
          <Input allowClear/>
        </Form.Item>
        <Form.Item name="description" label="Description" style={styles.label} rules={[{required: true}]}>
          <Input.TextArea allowClear autoSize={{minRows: 2, maxRows: 6}}/>
        </Form.Item>
        <Form.Item name="author" label="Author" style={styles.label} rules={[{required: true}]}>
          <Input allowClear/>
        </Form.Item>
        <Form.Item name="category" label="Category" style={styles.label} rules={[{required: true}]}>
          <Input allowClear/>
        </Form.Item>
        <Form.Item name="price" label="Price" style={styles.label} rules={[{required: true}]}>
          <Select type="number" min={0} step={0.01} allowClear>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </Select>
        </Form.Item>
        <Form.Item name="discount" label="Discount" style={styles.label} rules={[{required: true}]}>
          <Input type="number" min={0} step={0.01} allowClear/>
        </Form.Item>
        {/* <Form.Item name="image" label="Image" style={styles.label} rules={[{required: true}]}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={(e)=>{
              form.setFieldsValue({
                image: e.base64
              })
            }}
          />
        </Form.Item> */}
        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6
          }}
          >
          <Button type="primary" style={styles.button} block htmlType='submit'>
            Add Book
          </Button>
          </Form.Item>
        {!selectedId ? null : 
          <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6
          }}
          >
          <Button type="primary" style={styles.button} block htmlType='button' onClick={reset}>
            Discard
          </Button>
          </Form.Item>
        }
      </Form>
    </Card>
  )
}

export default BookForm
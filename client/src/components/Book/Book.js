import React, {useState} from 'react';
import {Card, Tooltip, Typography, Image} from "antd";
import {EditOutlined, DeleteTwoTone } from "@ant-design/icons"
import { useDispatch } from 'react-redux';
import styles from './styles'
import { deleteBook } from '../../actions/books';

const {Meta} = Card;
const {Link, Paragraph, Text} = Typography

function Book({book, setSelectedId}){
    const dispatch = useDispatch();
    const [expand, setExpand] = useState(true);

    const user = JSON.parse(localStorage.getItem("profile"));
    const cardActions = [
        <Tooltip
            placement='top'
            title='Edit'
        >

            <EditOutlined onClick={()=>{
                // console.log(user?.result?.id)
                // console.log(book?.postedBy)
                // console.log(book.id)
                // debugger;
                setSelectedId(book.id);
            }}/>
        </Tooltip>,
        <Tooltip
            placement='top'
            title='Delete'
            color='red'
        >
            <DeleteTwoTone twoToneColor="red" onClick={()=> dispatch(deleteBook(book.id))}/>
        </Tooltip>
    ];

    return (
        <Card 
            style={styles.card}
            // cover={<Image src = {book.image} style={styles.image}/>}
            actions={
                user?.result?.id === book?.postedBy ? cardActions : user?.result ? cardActions.slice(0,0) : null
            }>

            <Meta title={book.title}/>
            <Paragraph
                style={{margin:0}}
                ellipsis={{
                    rows: 2,
                    expandable: true,
                    symbol: "more",
                    onExpand:()=>{setExpand(true)},
                    onEllipsis:()=>{setExpand(false)}
                }}
                >
                {book.description}
                
                
            </Paragraph>
            {/* {expand ?
                <Link href="#">{`₹${book.price} `}</Link>
            : null } */}
            <Text strong="true">Category: {book.category}</Text>
            <br/>
            <Text italic="true">Author: {book.author}</Text>
            <br/>
            <Link href="#">{`₹${book.price} `}</Link>
            <br/>
            <Text strong="true" style={{color: "green"}}>Discount: {`${book.discount}%`}</Text>
        </Card>
    )
}

export default Book;
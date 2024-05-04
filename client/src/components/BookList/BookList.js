import React from 'react'
import {Row, Col, Spin} from "antd"
import Book from '../Book'
import { useSelector } from 'react-redux'
import styles from '../BookList/styles'

const BookList = ({setSelectedId}) => {
  const books = useSelector((state)=>state.books)
  // const id = []
  console.log(books)

  return !books.length ? 
  <div style={{textAlign:"center"}}>
    <Spin size="large"/>
  </div> :
  (
    <Row gutter={[20, 20]} style={styles.rows}>
        {
          books.map((book) => {
            return (
              <Col key ={book.id} lg={12} xl={8} xxl={6}>
                <Book setSelectedId={setSelectedId} book={book}/>
              </Col>
            )
          })
        }
    </Row>
  )
}

export default BookList
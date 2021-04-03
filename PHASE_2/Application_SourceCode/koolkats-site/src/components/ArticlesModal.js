import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import "bootstrap/dist/css/bootstrap.min.css";

const ArticlesModal = ({show, handleClose, country, disease, timeRange}) => {
    const [articles, setArticles] = useState([])
    const [showSpinner, setShowSpinner] = useState('block')
    useEffect(() => {
        setArticles([{'title': "article title", 'link': 'this is the article link', 'date': '3/04/2021'},{'title': "article title 2", 'link': 'this is another article link', 'date': '4/04/2021'}])
        setShowSpinner('none')
    }, [])
    return (
        <Modal size="lg" centred={true} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Container>
                    <Row>
                        <Modal.Title style={{padding: '15px', textAlign: 'center'}}>
                            Articles for
                        </Modal.Title>
                    </Row>
                    <Row>
                        <Col>Location: {country}</Col>
                        <Col>Disease: {disease}</Col>
                        <Col>Time Period: {timeRange.start} - {timeRange.end}</Col>
                    </Row>
                </Container>
            </Modal.Header>
            <Modal.Body scrollable={true}>
                <Spinner animation="border" role="status" style={{display: showSpinner}}>
                    <span className="sr-only">Getting Articles...</span>
                </Spinner>
                {articles.map((article) => (<Article article={article}/>))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal> 
    );
  };
const style = {
    boxShadow: '2px 2px 1px grey',
    border: '1px solid grey',
    margin: 'auto',
    padding: '10px'
}

const Article = ({article}) => {
    console.log("article:" + article)
    return (
        <Container fluid={true} style={style}>
            <Row>
                <Col md="auto">{article.title}</Col>
                <Col>{article.date}</Col>
            </Row>
            <Row>
                <Col>{article.link}</Col>
            </Row>
        </Container>
    );
}

  export default ArticlesModal;
  
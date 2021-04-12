import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import "bootstrap/dist/css/bootstrap.min.css";
import {getArticles} from './RequestData'

const ArticlesModal = ({show, handleClose, location, disease, startDate, endDate}) => {
    // article modal parent object
    /*
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    <ArticlesModal handleClose={handleClose} show={show} location="France" disease={selectedDiseases} startDate={startDate} endDate={endDate}/>
    */
    const [articles, setArticles] = useState([])
    const [showSpinner, setShowSpinner] = useState('block')
    useEffect(() => {
        async function fetchData () {
            const articlesFound = await getArticles(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0], disease, location)
            try {
                if (Array.isArray(articlesFound.articles)) {
                    setArticles(articlesFound.articles)
                } else {
                    setArticles([{'headline': "article title", 'url': 'this is the article link', 'date_of_publication': '3/04/2021'},{'headline': "article title 2", 'url': 'this is another article link', 'date_of_publication': '4/04/2021'}])
                }
            } catch {
                setArticles([{'headline': "article title", 'url': 'this is the article link', 'date_of_publication': '3/04/2021'},{'headline': "article title 2", 'url': 'this is another article link', 'date_of_publication': '4/04/2021'}])
            }

            setShowSpinner('none')
        }
        fetchData()
    }, [])
    const reverseList = () => {
        const reversed = articles.reverse()
        setArticles(reversed)
    }
    return (
        <Modal 
            size="lg" 
            centred={true} 
            show={show} 
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Container>
                    <Row>
                        <Modal.Title 
                            style={{
                                padding: '15px', 
                                textAlign: 'center'
                            }}
                        >
                            Articles for
                        </Modal.Title>
                    </Row>
                    <Row>
                        <Col>Location: {location}</Col>
                        <Col>Diseases: {disease.join(', ')}</Col>
                        <Col>Time Period: {startDate.toISOString().split('T')[0].replace(/-/g, '/')} - {endDate.toISOString().split('T')[0].replace(/-/g, '/')}</Col>
                    </Row>
                    <Row>
                        Articles from WHO may be from the old website and may not work
                    </Row>
                </Container>
            </Modal.Header>
            <Modal.Body scrollable={true}>
                <Spinner 
                    animation="border" 
                    role="status" 
                    style={{display: showSpinner}}
                >
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

const Article = ({article}) => {
    let headline = article.headline
    if (article.headline === '') {
        headline = 'Untitled'
    }
    const [show, setShow] = useState('none')
    function handleShow() {
        console.log("handleshow clicked")
        if (show === 'none') {
            setShow("block")
        } else {
            setShow('none')
        }
    }
    return (
        <Container 
            fluid={true} 
            style={{
                boxShadow:'2px 2px 1px grey', 
                border: '1px solid grey',
                margin: 'auto',
                padding: '10px'
            }}
            onClick={() => handleShow()}
        >
            <Row>
                <Col md="auto">{article.date_of_publication.split(' ')[0].replace(/-/g, '/')}</Col>
                <Col md="auto"><b>{headline}</b></Col>
            </Row>
            <Row>
                <Col><a href={article.url}>{article.url}</a></Col>
            </Row>
            <Row>
                <Col>View Article Text</Col>
            </Row>
            <Row style={{display: show}}>
                <Col>{article.main_text}</Col>
            </Row>
        </Container>
    );
}

  export default ArticlesModal;
  
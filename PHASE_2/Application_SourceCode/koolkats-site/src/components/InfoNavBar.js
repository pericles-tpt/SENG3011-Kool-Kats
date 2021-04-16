import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav'
import { Multiselect } from "multiselect-react-dropdown";
import InputInfo from './InputInfo'
import RestrictionsOverlay from './RestrictionsOverlay'
import ChangeInCasesOverTime from './ChangeInCasesOverTime'
import ArticlesModal from './ArticlesModal'
import { getVaccinationPercentage } from "./RequestData";

const InfoNavBar = ({setShowTopDiseases, country, diseases, startDate, endDate}) => {
    const [showInputInfo, setShowInputInfo] = useState('block')
    const [diseaseList, setSelectedDiseases] = useState(diseases)
    const [showRestrictions, setShowRestrictions] = useState('none')
    const [showViewArticles, setShowViewArticles] = useState('none')
    const [showArticlesModal, setShowArticlesModal] = useState(false);
    const handleClose = () => setShowArticlesModal(false);
    const [vaccinationPercentage, setVaccinationPercentage] = useState("...")
    const [showChange, setShowChange] = useState(false)
    const [showVaccinationPercentage, setShowVaccinationPercentage] = useState('none')
    const onSelect = (selectedList, selectedItem) => {
        setSelectedDiseases([...diseaseList, selectedItem]);
    };

    const onRemove = (selectedList, removedItem) => {
        const selectedDiseasesCopy = [...diseaseList].filter((disease) => {
          return disease !== removedItem;
        });
        setSelectedDiseases(selectedDiseasesCopy);
    };
    useEffect(() => {
        async function getVaccinationInfo() {
            const percentage = await getVaccinationPercentage(country)
            setVaccinationPercentage(percentage)
        }
        getVaccinationInfo()
      }, [country])
    useEffect(() => {

    }, [showInputInfo, showArticlesModal, showRestrictions, showVaccinationPercentage, showViewArticles])
    return (
        <Container>
            <Nav variant="tabs" defaultActiveKey="/topdisease" >
                <Nav.Item eventkey="/input" >
                    <Button variant="light" onClick={() => {
                        setShowInputInfo('block')
                        setShowTopDiseases('none')
                        setShowViewArticles('none')
                        setShowChange(false)
                        setShowVaccinationPercentage('none')
                        setShowRestrictions('none')
                    }}>Inputs</Button>
                </Nav.Item>
                <Nav.Item href="/topdisease">
                    <Button variant="light" onClick={() => {
                        setShowInputInfo('none')
                        setShowTopDiseases('block')
                        setShowViewArticles('none')
                        setShowChange(false)
                        setShowVaccinationPercentage('none')
                        setShowRestrictions('none')
                    }}>Top Diseases</Button>
                </Nav.Item>
                <Nav.Item eventkey="/vaccination">
                    <Button variant="light" onClick={() => {
                        setShowInputInfo('none')
                        setShowTopDiseases('none')
                        setShowViewArticles('none')
                        setShowChange(false)
                        setShowVaccinationPercentage('block')
                        setShowRestrictions('none')
                    }}>COVID Vaccination</Button>
                </Nav.Item>
                <Nav.Item eventkey="/moreInfo">
                    <Button variant="light" onClick={() => {
                        setShowInputInfo('none')
                        setShowTopDiseases('none')
                        setShowViewArticles('block')
                        setShowChange(true)
                        setShowVaccinationPercentage('none')
                        if (country.toLowerCase() === 'australia') {
                            setShowRestrictions('block')
                        }
                    }}>More Info</Button>
                </Nav.Item>
                <Nav.Item>
                    <Button 
                        variant="light"
                        onClick={() => {
                            setShowArticlesModal(!showArticlesModal)
                        }}
                    >
                        View related articles
                    </Button>
                </Nav.Item>
            </Nav>
            <Row style={{display: showInputInfo}}>
                <InputInfo 
                    diseases={diseases} 
                    startDate={startDate} 
                    endDate={endDate}
                /> 
            </Row>
            <Row 
                className="justify-content-md-center"
            >
                <ArticlesModal 
                handleClose={handleClose} 
                show={showArticlesModal} 
                location={country} 
                disease={diseases} 
                startDate={startDate} 
                endDate={endDate}/>
            </Row>
            <Row className="justify-content-md-center">
                <RestrictionsOverlay show={showRestrictions}/>
            </Row>
            <Container fluid>
                <Row className="justify-content-md-center" style={{display: showViewArticles}}>
                    <Col>Choose diseases: </Col>
                    <Col> 
                        <Multiselect
                        options={diseases}
                        isObject={false}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        />
                    </Col>
                </Row>
            </Container>
            <Row 
                className="justify-content-md-center" 
                style={{display: showVaccinationPercentage}}
            >
                <br></br>
                {(country.toLowerCase() !== 'world') ? 'COVID-19 Vaccination Percentage: ' + vaccinationPercentage + '%': 'Could not get vaccination information'}
                <br></br>
            </Row>
            <Row className="justify-content-md-center" >
                <ChangeInCasesOverTime 
                    show={showChange} 
                    disease={diseaseList}
                    startDate={startDate}
                    endDate={endDate}
                    location={country}
                />
            </Row>
    </Container>
    );
  };


  export default InfoNavBar;
  
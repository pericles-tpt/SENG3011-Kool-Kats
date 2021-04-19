import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import { Multiselect } from "multiselect-react-dropdown";
import RestrictionsOverlay from "./RestrictionsOverlay";
import ChangeInCasesOverTime from "./ChangeInCasesOverTime";
import ArticlesModal from "./ArticlesModal";
import CovidGraph from "./CovidGraph";

const InfoNavBar = ({
  setShowTopDiseases,
  country,
  diseases,
  startDate,
  endDate,
}) => {
  const [diseaseList, setSelectedDiseases] = useState(diseases);
  const [showRestrictions, setShowRestrictions] = useState("none");
  const [showViewArticles, setShowViewArticles] = useState("none");
  const [showArticlesModal, setShowArticlesModal] = useState(false);
  const handleClose = () => setShowArticlesModal(false);
  const [showChange, setShowChange] = useState(false);
  const [showVaccinationPercentage, setShowVaccinationPercentage] = useState(
    "none"
  );
  const [showRestrictionsTab, setShowRestrictionsTab] = useState("none");
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
    if (country.toLowerCase() === "australia") {
      setShowRestrictionsTab("block");
    } else {
      setShowRestrictionsTab("none");
    }
  }, [country]);
  useEffect(() => {}, [
    showArticlesModal,
    showRestrictions,
    showVaccinationPercentage,
    showViewArticles,
  ]);
  return (
    <Container>
      <Nav defaultActiveKey="/topdisease">
        <Row className="justify-content-center">
          <Nav.Item href="/topdisease">
            <Button
              variant="outline-primary"
              className="m-1"
              onClick={() => {
                setShowTopDiseases("block");
                setShowViewArticles("none");
                setShowChange(false);
                setShowVaccinationPercentage("none");
                setShowRestrictions("none");
              }}
            >
              {country !== "World" ? "Top Diseases" : "Top Countries"}
            </Button>
          </Nav.Item>
          <Nav.Item eventkey="/vaccination">
            <Button
              variant="outline-primary"
              className="m-1"
              onClick={() => {
                setShowTopDiseases("none");
                setShowViewArticles("none");
                setShowChange(false);
                setShowVaccinationPercentage("block");
                setShowRestrictions("none");
              }}
            >
              COVID Info
            </Button>
          </Nav.Item>
          <Nav.Item eventkey="/moreInfo">
            <Button
              variant="outline-primary"
              className="m-1"
              onClick={() => {
                setShowTopDiseases("none");
                setShowViewArticles("block");
                setShowChange(true);
                setShowVaccinationPercentage("none");
                setShowRestrictions("none");
              }}
            >
              Disease Info
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button
              className="m-1"
              variant="outline-primary"
              onClick={() => {
                setShowArticlesModal(!showArticlesModal);
              }}
            >
              View related articles
            </Button>
          </Nav.Item>
          <Nav.Item
            eventkey="/restrictions"
            style={{ display: showRestrictionsTab }}
          >
            <Button
              className="m-1"
              variant="outline-primary"
              onClick={() => {
                setShowTopDiseases("none");
                setShowViewArticles("none");
                setShowChange(false);
                setShowVaccinationPercentage("none");
                if (country.toLowerCase() === "australia") {
                  setShowRestrictions("block");
                }
              }}
            >
              State Restrictions
            </Button>
          </Nav.Item>
        </Row>
      </Nav>
      <div className="information-divider"></div>
      <Row className="justify-content-md-center">
        <ArticlesModal
          handleClose={handleClose}
          show={showArticlesModal}
          location={country}
          disease={diseases}
          startDate={startDate}
          endDate={endDate}
        />
      </Row>
      <Row className="justify-content-md-center">
        <RestrictionsOverlay show={showRestrictions} />
      </Row>
      <Container fluid>
        <Row
          className="justify-content-md-center"
          style={{ display: showViewArticles }}
        >
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
        style={{ display: showVaccinationPercentage }}
      >
        <CovidGraph
          show={showVaccinationPercentage}
          disease={diseaseList}
          startDate={startDate}
          endDate={endDate}
          location={country}
        />
      </Row>
      <Row className="justify-content-md-center">
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

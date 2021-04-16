import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Multiselect } from "multiselect-react-dropdown";
import DatePicker from "react-date-picker";

export default function FilterInputs({
  selectedDiseases,
  setSelectedDiseases,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  showInformation,
  setShowInformation,
  setSelectedCountry,
}) {
  const diseaseList = [
    "listeriosis",
    "yellow fever",
    "cholera",
    "haemorrhagic fever syndrome",
    "acute watery diarrhoeal syndrome",
    "leishmaniasis",
    "dengue fever",
    "influenza",
    "acute respiratory syndrome",
    "measles",
    "staphylococcal food intoxication",
    "lassa fever",
    "meningococcal disease",
    "leptospirosis",
    "rift valley fever",
    "middle east respiratory syndrome coronavirus (mers-cov)",
    "monkeypox",
    "ebola virus disease",
    "chikungunya",
    "gonococcal infection",
    "hantavirus pulmonary syndrome",
    "poliomyelitis",
    "hepatitis",
    "oropouche virus disease",
    "COVID-19",
    "typhoid fever",
    "nipah virus",
    "plague",
    "myocarditis",
    "anthrax",
    "rabies",
    "legionellosis",
    "enterovirus",
    "malaria",
    "crimean-congo haemorrhagic fever",
    "dengue haemorrhagic fever",
    "legionnaires",
    "west nile fever",
    "relapsing fever",
    "coccidioidomycosis",
    "acute neurological syndrome",
    "shigellosis",
    "marburg haemorrhagic fever",
    "japanese encephalitis",
    "botulism",
  ];

  const onSelect = (selectedList, selectedItem) => {
    setSelectedDiseases([...selectedDiseases, selectedItem]);
  };

  const onRemove = (selectedList, removedItem) => {
    const selectedDiseasesCopy = [...selectedDiseases].filter((disease) => {
      return disease !== removedItem;
    });
    setSelectedDiseases(selectedDiseasesCopy);
  };

  //   to convert input date to format for API request - dateObject.toISOString().split('T')[0] + "T00:00:00"

  //   React.useEffect(() => {
  //     console.log(endDate.toISOString().split("T")[0] + "T00:00:00");
  //   }, [endDate]);

  //   React.useEffect(() => {
  //     console.log(selectedDiseases);
  //   }, [selectedDiseases]);

  return (
    <>
      <Form>
        <Container className="filter-input-container">
          <Row className="align-items-start">
            <Col>
              <h5>Disease(s):</h5>
              <Multiselect
                options={diseaseList}
                isObject={false}
                onSelect={onSelect}
                onRemove={onRemove}
              />
            </Col>
            <Col>
              <h5>Time Period:</h5>
              <Row className="align-items-center justify-content-center">
                <Col xs="auto">
                  <DatePicker onChange={setStartDate} value={startDate} />
                </Col>
                <Col xs="auto">
                  <h5 className="text-center"> - </h5>
                </Col>
                <Col xs="auto">
                  <DatePicker onChange={setEndDate} value={endDate} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Button
              onClick={() => {
                setShowInformation(!showInformation);
              }}
              className="mt-3 mx-1"
            >
              {showInformation ? "Hide info" : "View Info"}
            </Button>
            <Button
              onClick={() => {
                setSelectedCountry("World");
              }}
              className="mt-3 mx-1"
            >
              Clear Country
            </Button>
          </Row>
        </Container>
      </Form>
    </>
  );
}

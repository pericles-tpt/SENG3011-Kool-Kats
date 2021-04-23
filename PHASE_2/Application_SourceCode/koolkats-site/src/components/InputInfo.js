import Container from "react-bootstrap/Container";

const InputInfo = ({ diseases, startDate, endDate }) => {
  return (
    <Container>
      <p>Selected Diseases: {diseases.join(", ")}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
    </Container>
  );
};
export default InputInfo;

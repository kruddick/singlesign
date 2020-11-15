import React from "react";
import FileContainer from "./FileLoader/FileContainer";

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfFiles: [],
      signers: [],
      step: 0,
    };
  }

  componentDidMount() {}

  updatePdfFiles(pdfFiles) {
    this.setState({ pdfFiles });
  }

  moveToNextStep() {
    this.setState({ step: this.state.step + 1 });
  }

  moveToPreviousStep() {
    if (this.state.step > 0) {
      this.setState({ step: this.state.step - 1 });
    }
  }

  render() {
    if (this.state.step === 0) {
      return (
        <div>
          <FileContainer />
        </div>
      );
    } else if (this.state.step === 1) {
      return <div>Signing</div>;
    }
  }
}

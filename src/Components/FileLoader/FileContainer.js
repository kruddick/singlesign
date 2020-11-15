import React from "react";
import Dropzone from "./SelectPdfs";
import FileItem from "./FileItem";

export default class FileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signerPdfFiles: [],
      supplePdfFiles: [],
      totalBytes: 0,
      currentSize: "0 MB",
    };
    this.updatePdfFiles = this.updatePdfFiles.bind(this);
    this.formatBytes = this.formatBytes.bind(this);
  }

  componentDidMount() {}

  updatePdfFiles = (pdfFiles) => {
    this.setState({ pdfFiles });
  };

  addSignerPdfs = (pdfFiles) => {
    this.setState(
      {
        signerPdfFiles: this.state.signerPdfFiles.concat(pdfFiles),
      },
      () => {
        this.currentSize();
      }
    );
  };

  removeSignerPdfs = (pdfName) => {
    let newPdfs = this.state.signerPdfFiles.filter((file) => {
      return file.name !== pdfName;
    });
    this.setState({ signerPdfFiles: newPdfs }, () => {
      this.currentSize();
    });
  };

  removeSupplePdfs = (pdfName) => {
    let newPdfs = this.state.supplePdfFiles.filter((file) => {
      return file.name !== pdfName;
    });
    this.setState({ supplePdfFiles: newPdfs }, () => {
      this.currentSize();
    });
  };

  addSupplementalPdfs = (pdfFiles) => {
    this.setState(
      {
        supplePdfFiles: this.state.supplePdfFiles.concat(pdfFiles),
      },
      () => {
        this.currentSize();
      }
    );
  };

  renderfile = (files) => {
    return files.map((x) => <FileItem file={x} />);
  };

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  currentSize = () => {
    let signerSize = 0;
    if (this.state.signerPdfFiles.length > 0) {
      signerSize = this.state.signerPdfFiles.reduce((total, file) => {
        return total + file.size;
      }, 0);
    }

    let suppleSize = 0;
    if (this.state.supplePdfFiles.length > 0) {
      suppleSize = this.state.supplePdfFiles.reduce((total, file) => {
        return total + file.size;
      }, 0);
    }
    this.setState({
      totalBytes: signerSize + suppleSize,
      currentSize: this.formatBytes(signerSize + suppleSize),
    });
  };

  render() {
    return (
      <div>
        <div className="filedrop-header">Please select files</div>
        <div className="filedrop-status">
          <div>
            <span className="bolded-text">Total File Size:</span> 10 MB
          </div>
          <div>
            <span className="bolded-text">Current space used:</span>{" "}
            {this.state.currentSize}
          </div>
        </div>
        <div className="filedrop-drop-header">Drop Files to Sign Here:</div>
        <div className="filedrop-droparea">
          <Dropzone callback={this.addSignerPdfs} />
        </div>
        <div className="filedrop-filelist">
          {this.state.signerPdfFiles.length > 0 ? (
            this.state.signerPdfFiles.map((x) => (
              <FileItem key={x.name} file={x} remove={this.removeSignerPdfs} />
            ))
          ) : (
            <div></div>
          )}
        </div>
        <div className="filedrop-drop-header">
          Drop Supplemental Files Here:
        </div>
        <div className="filedrop-droparea">
          <Dropzone callback={this.addSupplementalPdfs} />
        </div>
        <div className="filedrop-filelist">
          {this.state.supplePdfFiles.length > 0 ? (
            this.state.supplePdfFiles.map((x) => (
              <FileItem key={x.name} file={x} remove={this.removeSupplePdfs} />
            ))
          ) : (
            <div></div>
          )}
        </div>
        <div className="filedrop-footer">
          <div>Files under max limit</div>
          <div>
            <button>submit</button>
          </div>
        </div>
      </div>
    );
  }
}

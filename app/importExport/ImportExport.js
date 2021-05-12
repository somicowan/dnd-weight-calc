import React, { Component } from 'react';
import md5 from './md5.js';

class ImportExport extends Component {
    constructor(props){
        super(props);
        this.state = {
            importCode: "",
            importMessage: ""
        }
    }

    handleImportInput(event) {
        this.setState({ importCode: event.target.value });
    }

    handleImportButton() {
        try {
            const codeJson = JSON.parse(this.state.importCode);

            if(codeJson.hash == md5(codeJson.bag)) {
                this.props.updateBag(codeJson.bag);
            } else {
                this.setState({ importMessage: "Invalid import code submitted"});
            }
        } catch {
            this.setState({ importMessage: "Invalid import code submitted"});
        }
    }

    render() {
        let exportCode = {
            bag: this.props.bagCode,
            hash: md5(this.props.bagCode)
        }

        exportCode = JSON.stringify(exportCode);

        return(
            <div className="import-export-tool">
                <div className="import">
                    <h1>Import code from previous bag</h1>
                    <input onChange={() => this.handleImportInput(event)} type="text" />
                    <button onClick={() => this.handleImportButton()}>Import</button>
                    <p aria-live="polite">{this.state.importMessage}</p>
                </div>
                <div className="export">
                    <h1>Export current bag code</h1>
                    <p>Copy the text box below and save the content somewhere on your computer. Next time, paste the text into the import box to pick up where you left off!</p>
                    <input readOnly value={exportCode} type="text"/>
                </div>
            </div>
        )
    }
}

export default ImportExport;

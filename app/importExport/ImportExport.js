import React, { Component } from 'react';
import md5 from './md5.js';

import "./../commonStyles/expand.scss";
import './styles.scss';

class ImportExport extends Component {
    constructor(props){
        super(props);
        this.state = {
            importCode: "",
            importMessage: "",
            expanded: false
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

    toggleExpansion() {
        this.setState({ expanded : !this.state.expanded });
    }

    render() {
        let exportCode = {
            bag: this.props.bagCode,
            hash: md5(this.props.bagCode)
        }

        let expanded = this.state.expanded ? "section expanded" : "section";
        let expandedButton = this.state.expanded ? "-" : "+";
        let expandAria = this.state.expanded ? "Collapse Import/Export section" : "Expand Import/Export section";

        exportCode = JSON.stringify(exportCode);

        return(
            <div className="import-export-section">
                <h1>
                    <button className="expand-button" onClick={() => this.toggleExpansion()} aria-label={expandAria}>
                        Import / Export
                        <span>{expandedButton}</span>
                    </button>
                </h1>
                <div className={expanded} aria-expanded={this.state.expanded}>
                    <div className="import">
                        <h2>Import code from previous bag</h2>
                        <div className="form-group">
                            <input onChange={() => this.handleImportInput(event)} type="text" />
                            <button onClick={() => this.handleImportButton()}>Import</button>
                        </div>
                        <p aria-live="polite">{this.state.importMessage}</p>
                    </div>
                    <div className="export">
                        <h2>Export current bag code</h2>
                        <p>Copy the text box below and save the content somewhere on your computer. Next time, paste the text into the import box to pick up where you left off!</p>
                        <input readOnly value={exportCode} type="text"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImportExport;

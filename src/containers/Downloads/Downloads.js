import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ReactGA from "react-ga";
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import {
  isLoaded,
  load,
  showLicenseDialog,
  hideLicenseDialog,
  acceptLicense
} from 'redux/modules/downloads';
import MDReactComponent from 'markdown-react-js';
import {
  Button,
  Checkbox,
  Modal
} from 'react-bootstrap';

/* eslint-disable max-len */
@provideHooks({
  fetch: ({ store: { dispatch, getState } }) => !isLoaded(getState()) ? dispatch(load()).catch(() => null) : Promise.resolve()
})
@connect(
  (state) => ({
    markdown: state.downloads.markdown,
    license: state.downloads.license,
    isLicenseAccepted: state.downloads.isLicenseAccepted,
    isLicenseDialogVisible: state.downloads.isLicenseDialogVisible,
    fileName: state.downloads.fileName
  }),
  {
    load,
    showLicenseDialog,
    hideLicenseDialog,
    acceptLicense
  }
)
class Downloads extends Component {
  static propTypes = {
    markdown: PropTypes.string.isRequired,
    license: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    isLicenseAccepted: PropTypes.bool.isRequired,
    isLicenseDialogVisible: PropTypes.bool.isRequired,
    showLicenseDialog: PropTypes.func.isRequired,
    hideLicenseDialog: PropTypes.func.isRequired,
    acceptLicense: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleIterate = this.handleIterate.bind(this);
    this.key = 0;
  }

  handleIterate(Tag, props, children, level) {
    const {
      showLicenseDialog
    } = this.props;
    if (level === 1) {
      props = {
        ...props,
        className: 'first-level-class'
      };
    }
    if (Tag === 'p') {
      if (children.filter(child => child.$$typeof != null).length > 0) {
        this.key += 1;
        return <div key={`buttons-${this.key}`} style={{
          display: "inline"
        }}>{children}</div>;
      }
    }
    if (Tag === 'a') {
      const { href } = props;
      let [caption] = children;
      switch (caption) {
        case "Download":
          return <Button key={`download-${href}`} type="submit" onClick={() => showLicenseDialog(href)} bsStyle="primary" style={{
            display: "inline",
            verticalAlign: "middle"
          }}>Download</Button>;
        case "npm package":
          return <form key={`npm-${href}`} method="get" action={href} style={{
            display: "inline",
            verticalAlign: "middle"
          }}>
            <Button type="submit" bsStyle="success" onClick={() => {
              ReactGA.event({
                category: 'npm package',
                action: 'Click',
                label: href
              });
            }}>npm package</Button>
          </form>;
        case "GitHub":
          return <form key={`github-${href}`} method="get" action={href} style={{
            display: "inline",
            verticalAlign: "middle"
          }}>
            <Button type="submit" bsStyle="info" onClick={() => {
              ReactGA.event({
                category: 'GitHub',
                action: 'Click',
                label: href
              });
            }}>GitHub</Button>
          </form>;
        case "GitHub Deployment":
          return <form key={`github-${href}`} method="get" action={href} style={{
            display: "inline",
            verticalAlign: "middle"
          }}>
            <Button type="submit" bsStyle="warning" onClick={() => {
              ReactGA.event({
                category: 'GitHub Deployment',
                action: 'Click',
                label: href
              });
            }}>GitHub Deployment</Button>
          </form>;
      }
    }
    return <Tag {...props}>{children}</Tag>;
  }

  render() {
    this.key = 0;
    const { markdown, license, isLicenseAccepted, isLicenseDialogVisible, hideLicenseDialog, acceptLicense, fileName } = this.props;
    return <div className="container">
      <Helmet>
        <title>- Downloads</title>
        <meta name="description" content="Products, API Reference &amp; Demos sources downloads." />
      </Helmet>
      <MDReactComponent text={markdown} onIterate={this.handleIterate} />
      {isLicenseDialogVisible &&
        <Modal show={isLicenseDialogVisible} onHide={hideLicenseDialog} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">License agreement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ height: "480px", overflow: "auto" }}>
              <MDReactComponent text={license} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Checkbox checked={isLicenseAccepted} onChange={(event) => acceptLicense(!isLicenseAccepted)}>
              I agree to the terms listed above
          </Checkbox>
            <form method="get" target="_blank" action={fileName} style={{
              display: "inline",
              verticalAlign: "middle"
            }}>
              <Button type="submit" disabled={!isLicenseAccepted} bsStyle="primary" onClick={() => {
                ReactGA.event({
                  category: 'Downloads',
                  action: 'Click',
                  label: fileName
                });
              }}>Download</Button>
            </form> <Button onClick={hideLicenseDialog}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  }
}

export default Downloads;

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FamDiagram, FamDiagramConfig } from 'basicprimitivesreact';
import {
  Grid, Col, Row, Tab, NavItem, Nav, Well, NavDropdown, MenuItem, Button, ButtonGroup, Glyphicon
} from 'react-bootstrap';
import {
  RadioGroupOption,
  FamilyOptionsPanel,
  AutoLayoutOptionsPanel,
  DefaultTemplateOptionsPanel,
  GroupTitlesOptionsPanel,
  MinimizedItemsOptionsPanel,
  AnnotationOptionsPanel,
  IntervalsOptionsPanel,
  ConnectorsOptionsPanel,
  LabelsOptionsPanel,
  CalloutOptionsPanel,
  InteractivityOptionsPanel,
  RenderingOptionsPanel,
  PdfkitHelper
} from 'components';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import {
  load,
  isLoaded,
  setCursorItem,
  setHighlightAnnotations,
  setSelectedItems,
  setAnnotationSource,
  setAnnotationDestination,
  setConfigOption,
  setTemplateOption,
  setAnnotationOption,
  UserActionType
} from 'redux/modules/demos/familychartwithannotations';

const primitives = require('basicprimitives');

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isLoaded(getState())) {
      const { familychartwithannotations } = getState();
      await dispatch(load(familychartwithannotations.datasetName)).catch(() => null);
    }
    return Promise.resolve();
  },
  defer: ({ store: { dispatch } }) => dispatch(setConfigOption('scale', (window.devicePixelRatio > 1 ? 0.5 : 1)))
})
@connect(
  state => ({
    datasetName: state.familychartwithannotations.datasetName,
    datasetNames: state.familychartwithannotations.datasetNames,
    centerOnCursor: state.familychartwithannotations.centerOnCursor,
    config: state.familychartwithannotations.config,
    userAction: state.familychartwithannotations.userAction,
    itemsHash: state.familychartwithannotations.itemsHash
  }),
  dispatch => bindActionCreators(
    {
      load,
      isLoaded,
      setCursorItem,
      setHighlightAnnotations,
      setSelectedItems,
      setAnnotationSource,
      setAnnotationDestination,
      setConfigOption,
      setTemplateOption,
      setAnnotationOption,
      UserActionType
    },
    dispatch
  )
)
class FamilyChartWithAnnotations extends Component {
  static propTypes = {
    datasetName: PropTypes.string.isRequired,
    datasetNames: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    centerOnCursor: PropTypes.bool.isRequired,
    config: FamDiagramConfig.isRequired,
    itemsHash: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    userAction: PropTypes.shape({
      type: PropTypes.oneOf(Object.values(UserActionType)),
      buttonName: PropTypes.string,
      itemId: PropTypes.number
    }).isRequired,
    load: PropTypes.func.isRequired,
    setCursorItem: PropTypes.func.isRequired,
    setHighlightAnnotations: PropTypes.func.isRequired,
    setSelectedItems: PropTypes.func.isRequired,
    setAnnotationSource: PropTypes.func.isRequired,
    setAnnotationDestination: PropTypes.func.isRequired,
    setConfigOption: PropTypes.func.isRequired,
    setTemplateOption: PropTypes.func.isRequired,
    setAnnotationOption: PropTypes.func.isRequired
  };

  getActionMessage() {
    const { config, itemsHash, userAction } = this.props;
    switch (userAction.type) {
      case UserActionType.None:
        return 'No user actions yet.';
      case UserActionType.ContextButtonClick: {
        const item = itemsHash[userAction.itemId];
        return `Use clicked context button ${userAction.buttonName} for item ${item.title}`;
      }
      case UserActionType.SelectedItems: {
        const selectedNames = config.selectedItems.map(itemid => itemsHash[itemid].title);
        return `User selected following items ${selectedNames.join(', ')}`;
      }
      case UserActionType.ChangedCursor: {
        const item = itemsHash[config.cursorItem];
        return `User changed cursor to item ${item.title}`;
      }
      default:
        return 'Unknown action.';
    }
  }

  render() {
    const styles = require('./FamilyChartWithAnnotations.scss');
    const {
      datasetName,
      datasetNames,
      centerOnCursor,
      config,
      load, // eslint-disable-line no-shadow
      setCursorItem, // eslint-disable-line no-shadow
      setHighlightAnnotations, // eslint-disable-line no-shadow
      setSelectedItems, // eslint-disable-line no-shadow
      setAnnotationSource, // eslint-disable-line no-shadow
      setAnnotationDestination, // eslint-disable-line no-shadow
      setConfigOption, // eslint-disable-line no-shadow
      setTemplateOption, // eslint-disable-line no-shadow
      setAnnotationOption // eslint-disable-line no-shadow
    } = this.props;
    const templateConfig = config.templates.find(template => template.name === 'defaultTemplate');
    const contactTemplateConfig = config.templates.find(template => template.name === 'contactTemplate');
    const miniTemplateConfig = config.templates.find(template => template.name === 'miniTemplate');
    const annotationConfig = config.annotations.find(annotation => annotation.annotationType === primitives.common.AnnotationType.Connector);
    const buttons = <>
      <Button onClick={() => PdfkitHelper.downloadFamDiagram(config, 'familychartwithannotations.pdf', 'Family Chart with Annotations Demo')}>Download PDF</Button>&nbsp;
      <Button onClick={() => load(datasetName)}>Reset</Button>
    </>;

    return (
      <Grid fluid className={styles.appContent}>
        <Helmet>
          <title>- Family Chart Visualization and Annotations</title>
          <meta name="description" content="Application demonstrates various inheritance and dependency graphs auto layout and rendering. Open source. Universal React architecture. JavaScript. Supports client side PDf rendering and download." />
        </Helmet>
        <Row>
          <Col smPush={4} sm={8} mdPush={3} md={9}>
            <div>
              <h2>
                <Grid fluid>
                  <Row>
                    <Col lg={8} md={12}>
                      Family Chart with Annotations
                    </Col>
                    <Col lg={4} xsHidden smHidden mdHidden>
                      <div className="pull-right">
                        {buttons}
                      </div>
                    </Col>
                    <Col md={12} lgHidden>
                      <p />{buttons}
                    </Col>
                  </Row>
                </Grid>
              </h2>
              <div className={styles.placeholder}>
                <FamDiagram
                  centerOnCursor={centerOnCursor}
                  config={{
                    ...config,
                    annotations: (config.annotations && config.annotations.map(annotation => {
                      const { label, title } = annotation;
                      if (label != null) {
                        const { badge, color, title } = annotation.label;
                        return {
                          ...annotation,
                          label: <><div className={styles.Badge} style={{
                            backgroundColor: color
                          }}>{badge}</div><span className={styles.BadgeLabel}>{title}</span></>
                        }
                      }
                      if (title != null) {
                        return {
                          ...annotation,
                          title: <div className={styles.InLayoutLabel}>{title}</div>
                        }
                      }
                      return annotation;
                    })),
                    onButtonsRender: (({ context: itemConfig }) => {
                      return <ButtonGroup className="btn-group-vertical">
                        <Button bsSize="small" key="out"
                          onClick={(event) => {
                            event.stopPropagation();
                            setAnnotationSource(itemConfig.id);
                          }}
                        ><Glyphicon glyph="log-out" />
                        </Button>
                        <Button bsSize="small" key="in"
                          onClick={(event) => {
                            event.stopPropagation();
                            setAnnotationDestination(itemConfig.id);
                          }}
                        >
                          <Glyphicon glyph="log-in" />
                        </Button>
                      </ButtonGroup>
                    }),
                    templates: [
                      {
                        ...templateConfig,
                        onItemRender: ({ context: itemConfig }) => {
                          const itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : primitives.common.Colors.RoyalBlue;
                          return <div className={styles.DefaultTemplate}>
                            <div className={styles.DefaultTitleBackground} style={{ backgroundColor: itemTitleColor }}>
                              <div className={styles.DefaultTitle}>{itemConfig.title}</div>
                            </div>
                            <div className={styles.DefaultPhotoFrame}>
                              <img className={styles.DefaultPhoto} src={itemConfig.image} alt={itemConfig.title} />
                            </div>
                            <div className={styles.DefaultDescription}>{itemConfig.description}</div>
                          </div>;
                        }
                      },
                      {
                        ...contactTemplateConfig,
                        onItemRender: ({ context: itemConfig }) => {
                          const itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : primitives.common.Colors.RoyalBlue;
                          return <div className={styles.ContactTemplate}>
                            <div className={styles.ContactTitleBackground} style={{ backgroundColor: itemTitleColor }}>
                              <div className={styles.ContactTitle}>{itemConfig.title}</div>
                            </div>
                            <div className={styles.ContactPhotoFrame}>
                              <img className={styles.ContactPhoto} src={itemConfig.image} alt={itemConfig.title} />
                            </div>
                            <div className={styles.ContactPhone}>{itemConfig.phone}</div>
                            <div className={styles.ContactEmail}>{itemConfig.email}</div>
                            <div className={styles.ContactDescription}>{itemConfig.description}</div>
                          </div>;
                        }
                      },
                      {
                        ...miniTemplateConfig,
                        onItemRender: ({ context: itemConfig }) => {
                          const itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : primitives.common.Colors.RoyalBlue;
                          return <div className={styles.MiniTemplate}>
                            <div className={styles.MiniTitleBackground} style={{ backgroundColor: itemTitleColor }}>
                              <div className={styles.MiniTitle}>{itemConfig.title}</div>
                            </div>
                          </div>;
                        }
                      }
                    ]
                  }}
                  onCursorChanging={(event, data) => {
                    const { context } = data;
                    setCursorItem(context.id);
                    // Return true in order to suppress set cursor item in control
                    // it will be updated via subsequent state change and rendering event
                    return true;
                  }}
                  onSelectionChanged={(event, currentSelectedItems, newSelectedItems) => {
                    setSelectedItems(newSelectedItems);
                  }}
                  onHighlightChanging={(event, data) => {
                    const { context: itemConfig } = data;
                    const id = itemConfig && itemConfig.id;
                    setHighlightAnnotations(id);
                  }}
                />
              </div>
              <br />
              <Well bsSize="small">{this.getActionMessage()}</Well>
              <p>
                Family chart visualizes multiple inheritance diagram, dependencies diagram and graphs in form of multiple inheritance hierarchy diagram. It bundles parents and
                children together into one inheritance line where it is possible.
              </p>
              <p>
                Chart nodes visibility depends on current cursor item. Chart shows all its siblings, children &amp; parents in full item size for easy navigation of large
                hiearchies. Siblings are nodes which share common parent or child. In other words siblings are child nodes accessable via parent or parent nodes accessable via
                child.
              </p>
              <p>
                Chart supports loops in inheritance. That means node can be parent of itself. Loop has no logical root so if chart has loops then first item in items collection is
                used as root. See "Loops" data set.
              </p>
              <p>Widget automatically groups nodes into bundles in order to minimize connection lines clutter in layout. See "Skipped members" data set.</p>
              <p>Root parents are placed close to their children. See "Side by side" data set.</p>
            </div>
          </Col>
          <Col smPull={8} sm={4} mdPull={9} md={3}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="datasetName">
              <Row className="clearfix">
                <Col lgHidden xs={12}>
                  <p />
                  <Nav bsStyle="pills" stacked>
                    <NavDropdown title="Select options panel">
                      <MenuItem eventKey="datasetName">Family dataset</MenuItem>
                      <MenuItem eventKey="family">Family Specific</MenuItem>
                      <MenuItem eventKey="autolayout">Auto Layout</MenuItem>
                      <MenuItem eventKey="defaulttemplate">Default Template</MenuItem>
                      <MenuItem eventKey="grouptitles">Group Titles</MenuItem>
                      <MenuItem eventKey="minimizeditems">Minimized Items</MenuItem>
                      <MenuItem eventKey="annotation">Connector Annotation</MenuItem>
                      <MenuItem eventKey="intervals">Intervals</MenuItem>
                      <MenuItem eventKey="connectors">Connectors</MenuItem>
                      <MenuItem eventKey="labels">Labels</MenuItem>
                      <MenuItem eventKey="callout">Callout</MenuItem>
                      <MenuItem eventKey="interactivity">Interactivity</MenuItem>
                      <MenuItem eventKey="rendering">Rendering</MenuItem>
                    </NavDropdown>
                  </Nav>
                </Col>
                <Col xsHidden smHidden mdHidden lg={5}>
                  <h4>Options</h4>
                  <Nav bsStyle="pills" stacked>
                    <NavItem eventKey="datasetName">Family dataset</NavItem>
                    <NavItem eventKey="family">Family Specific</NavItem>
                    <NavItem eventKey="autolayout">Auto Layout</NavItem>
                    <NavItem eventKey="defaulttemplate">Default Template</NavItem>
                    <NavItem eventKey="grouptitles">Group Titles</NavItem>
                    <NavItem eventKey="minimizeditems">Minimized Items</NavItem>
                    <NavItem eventKey="annotation">Connector Annotation</NavItem>
                    <NavItem eventKey="intervals">Intervals</NavItem>
                    <NavItem eventKey="connectors">Connectors</NavItem>
                    <NavItem eventKey="labels">Labels</NavItem>
                    <NavItem eventKey="callout">Callout</NavItem>
                    <NavItem eventKey="interactivity">Interactivity</NavItem>
                    <NavItem eventKey="rendering">Rendering</NavItem>
                  </Nav>
                </Col>
                <Col xs={12} lg={7}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="datasetName">
                      <h4>Family datasets</h4>
                      <RadioGroupOption caption="Names" propertyName="datasetName" value={datasetName} valueType="string" items={datasetNames} onChange={value => load(value)} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="family">
                      <FamilyOptionsPanel config={config} setOption={setConfigOption} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="autolayout">
                      <AutoLayoutOptionsPanel config={config} setOption={setConfigOption} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="defaulttemplate">
                      <DefaultTemplateOptionsPanel config={config} setOption={setConfigOption} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="grouptitles">
                      <GroupTitlesOptionsPanel config={config} setOption={setConfigOption} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="minimizeditems">
                      <MinimizedItemsOptionsPanel
                        config={templateConfig}
                        setOption={(name, value) => {
                          setTemplateOption('defaultTemplate', name, value);
                        }}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="annotation">
                      {annotationConfig == null ? (
                        <p>No connector annotations found to set options for. Choose another data set.</p>
                      ) : (
                          <AnnotationOptionsPanel
                            config={annotationConfig}
                            setOption={(name, value) => {
                              setAnnotationOption(primitives.common.AnnotationType.Connector, name, value);
                            }}
                          />
                        )}
                    </Tab.Pane>

                    <Tab.Pane eventKey="intervals">
                      <IntervalsOptionsPanel config={config} setOption={setConfigOption} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="connectors">
                      <ConnectorsOptionsPanel config={config} setOption={setConfigOption} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="labels">
                      <LabelsOptionsPanel config={config} setOption={setConfigOption} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="callout">
                      <CalloutOptionsPanel config={config} setOption={setConfigOption} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="interactivity">
                      <InteractivityOptionsPanel config={config} setOption={setConfigOption} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="rendering">
                      <RenderingOptionsPanel config={config} setOption={setConfigOption} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default FamilyChartWithAnnotations;

const primitives = require('basicprimitives');

const LOAD = 'redux-example/verticallayoutorganizationalchart/LOAD';
const LOAD_SUCCESS = 'redux-example/verticallayoutorganizationalchart/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/verticallayoutorganizationalchart/LOAD_FAIL';
const LOAD_MARKDOWN = 'redux-example/verticallayoutorganizationalchart/LOAD_MARKDOWN';
const LOAD_MARKDOWN_SUCCESS = 'redux-example/verticallayoutorganizationalchart/LOAD_SUCCESS_MARKDOWN';
const LOAD_MARKDOWN_FAIL = 'redux-example/verticallayoutorganizationalchart/LOAD_FAIL_MARKDOWN';
const SETCURSORITEM = 'redux-example/verticallayoutorganizationalchart/setCursorItem';
const SETSELECTEDITEMS = 'redux-example/verticallayoutorganizationalchart/setSelectedItems';
const SETCLICKEDBUTTON = 'redux-example/verticallayoutorganizationalchart/setClickedButton';
const SETCONFIGOPTION = 'redux-example/verticallayoutorganizationalchart/setConfigOption';
const SETTEMPLATEOPTION = 'redux-example/verticallayoutorganizationalchart/setTemplateOption';
const SWITCHLTR = 'redux-example/verticallayoutorganizationalchart/switchLTR';

const chartName = 'verticallayoutorganizationalchart';

export const UserActionType = {
  None: 0,
  ContextButtonClick: 1,
  SelectedItems: 2,
  ChangedCursor: 3
};

const initialState = {
  loaded: false,
  markdown: "",
  markdownLoaded: false,
  userAction: {
    type: UserActionType.None,
    buttonName: null,
    itemId: null
  },
  centerOnCursor: true,
  config: {
    ...new primitives.orgdiagram.Config(),
    cursorItem: 0,
    items: [],
    defaultTemplateName: 'defaultTemplate',
    templates: [
      {
        ...new primitives.orgdiagram.TemplateConfig(),
        name: 'defaultTemplate',
        minimizedItemCornerRadius: null,
        minimizedItemSize: new primitives.common.Size(4, 4),
        highlightPadding: new primitives.common.Thickness(2, 2, 2, 2),
        minimizedItemShapeType: primitives.common.ShapeType.None,
        minimizedItemLineWidth: 1,
        minimizedItemLineType: primitives.common.LineType.Solid,
        minimizedItemBorderColor: null,
        minimizedItemFillColor: null,
        minimizedItemOpacity: 1.0
      },
      {
        ...new primitives.orgdiagram.TemplateConfig(),
        name: 'managerTemplate',
        itemSize: new primitives.common.Size(220, 120)
      }
    ],
    /* Layout */
    pageFitMode: primitives.common.PageFitMode.FitToPage,
    orientationType: primitives.common.OrientationType.Top,
    verticalAlignment: primitives.common.VerticalAlignmentType.Middle,
    horizontalAlignment: primitives.common.HorizontalAlignmentType.Left,
    childrenPlacementType: primitives.common.ChildrenPlacementType.Vertical,
    leavesPlacementType: primitives.common.ChildrenPlacementType.Horizontal,
    maximumColumnsInMatrix: 6,
    minimalVisibility: primitives.common.Visibility.Dot,
    selectionPathMode: primitives.common.SelectionPathMode.FullStack,

    hasButtons: primitives.common.Enabled.Auto,
    hasSelectorCheckbox: primitives.common.Enabled.True,
    selectCheckBoxLabel: 'Selected',
    itemTitleFirstFontColor: primitives.common.Colors.White,
    itemTitleSecondFontColor: primitives.common.Colors.White,
    buttonsPanelSize: 42,
    groupTitlePanelSize: 24,
    checkBoxPanelSize: 24,

    /* group title options */
    groupTitlePlacementType: primitives.common.AdviserPlacementType.Left,
    groupTitleOrientation: primitives.text.TextOrientationType.RotateRight,
    groupTitleVerticalAlignment: primitives.common.VerticalAlignmentType.Middle,
    groupTitleHorizontalAlignment: primitives.common.HorizontalAlignmentType.Center,
    groupTitleFontSize: '12px',
    groupTitleFontFamily: 'Arial',
    groupTitleColor: primitives.common.Colors.RoyalBlue,
    groupTitleFontWeight: 'normal',
    groupTitleFontStyle: 'normal',

    /* Intervals */
    normalLevelShift: 20,
    dotLevelShift: 30,
    lineLevelShift: 10,
    normalItemsInterval: 20,
    dotItemsInterval: 12,
    lineItemsInterval: 5,
    cousinsIntervalMultiplier: 0,

    /* Connectors */
    arrowsDirection: primitives.common.GroupByType.None,
    showExtraArrows: false,
    extraArrowsMinimumSpace: 30,
    connectorType: primitives.common.ConnectorType.Squared,
    elbowType: primitives.common.ElbowType.None,
    bevelSize: 4,
    elbowDotSize: 4,
    linesType: primitives.common.LineType.Solid,
    linesColor: primitives.common.Colors.Silver,
    linesWidth: 1,

    /* Labels */
    showLabels: primitives.common.Enabled.Auto,
    labelSize: new primitives.common.Size(10, 14),
    labelOrientation: primitives.text.TextOrientationType.Horizontal,
    labelPlacement: primitives.common.PlacementType.Bottom,
    labelOffset: 3,
    labelFontSize: '10px',
    labelFontFamily: 'Arial',
    labelColor: primitives.common.Colors.Black,
    labelFontWeight: 'normal',
    labelFontStyle: 'normal',

    /* Callout */
    calloutMaximumVisibility: primitives.common.Visibility.Dot,
    showCallout: true,
    calloutPlacementOffset: 100,
    calloutfillColor: '#000000',
    calloutBorderColor: null,
    calloutOffset: 4,
    calloutCornerRadius: 4,
    calloutPointerWidth: '10%',
    calloutLineWidth: 1,
    calloutOpacity: 0.2,

    /* Interactivity */
    navigationMode: primitives.common.NavigationMode.Default,
    highlightGravityRadius: 40,
    enablePanning: true,

    /* Graphics */
    graphicsType: primitives.common.GraphicsType.SVG,

    scale: 1.0
  },
  itemsHash: {}
};

function getItemsHash(items = []) {
  const newItemsHash = {};
  items.reduce((agg, item) => {
    agg[item.id] = item;
    return agg;
  }, newItemsHash);
  return {
    itemsHash: newItemsHash
  };
}

function getUserAction(type, buttonName, itemId) {
  return {
    userAction: {
      type,
      buttonName,
      itemId
    }
  };
}

function getCursorItem(config, cursorItem) {
  return {
    centerOnCursor: true,
    config: {
      ...config,
      cursorItem
    }
  };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_SUCCESS: {
      const { config: { scale } } = state;
      const { config } = initialState;
      return {
        ...state,
        loading: false,
        loaded: true,
        ...getCursorItem(
          {
            ...config,
            ...action.result,
            scale
          },
          config.cursorItem
        ),
        ...getItemsHash(action.result.items)
      };
    }

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };

    case LOAD_MARKDOWN: {
      return {
        ...state,
        markdownLoading: true
      };
    }

    case LOAD_MARKDOWN_SUCCESS: {
      const { result } = action;
      const { markdown } = result;
      return {
        ...state,
        markdownLoading: false,
        markdownLoaded: true,
        markdown
      };
    }
    case LOAD_MARKDOWN_FAIL: {
      const { error } = action;
      return {
        ...state,
        markdown: 'File not found',
        markdownLoading: false,
        markdownLoaded: false,
        markdownError: error
      };
    }

    case SETCONFIGOPTION: {
      const { config, ...restState } = state;
      const newConfig = { ...config };
      newConfig[action.name] = action.value;
      return {
        ...restState,
        centerOnCursor: true,
        config: newConfig
      };
    }

    case SWITCHLTR: {
      const { config } = state;
      const isLTR = config.horizontalAlignment === primitives.common.HorizontalAlignmentType.Left;
      const newConfig = { ...config };
      const { items } = newConfig;
      newConfig["horizontalAlignment"] = isLTR ? primitives.common.HorizontalAlignmentType.Right : primitives.common.HorizontalAlignmentType.Left;
      newConfig["groupTitlePlacementType"] = isLTR ? primitives.common.AdviserPlacementType.Right : primitives.common.AdviserPlacementType.Left;
      newConfig["groupTitleOrientation"] = isLTR ? primitives.text.TextOrientationType.RotateLeft : primitives.text.TextOrientationType.RotateRight;
      
      newConfig.items = items.map(item => {
        if (item.itemType === primitives.orgdiagram.ItemType.Adviser || item.itemType === primitives.orgdiagram.ItemType.Assistant) {
          const newItem = { ...item };
          newItem["adviserPlacementType"] = isLTR ? primitives.common.AdviserPlacementType.Left : primitives.common.AdviserPlacementType.Right;
          return newItem;
        }
        return item;
      })

      return {
        ...state,
        centerOnCursor: true,
        config: newConfig
      };
    }

    case SETTEMPLATEOPTION: {
      const { config, ...restState } = state;
      const { templates, ...restConfig } = config;
      return {
        ...restState,
        centerOnCursor: false,
        config: {
          ...restConfig,
          templates: templates.map(template => {
            if (template.name === action.templateName) {
              const newTemplate = { ...template };
              newTemplate[action.name] = action.value;
              return newTemplate;
            }
            return template;
          })
        }
      };
    }

    case SETCURSORITEM: {
      const { config, ...restState } = state;
      return {
        ...restState,
        ...getCursorItem(config, action.cursorItem),
        ...getUserAction(UserActionType.ChangedCursor)
      };
    }

    case SETSELECTEDITEMS: {
      const { config, ...restState } = state;
      return {
        ...restState,
        centerOnCursor: false,
        config: {
          ...config,
          selectedItems: action.selectedItems
        },
        ...getUserAction(UserActionType.SelectedItems)
      };
    }

    case SETCLICKEDBUTTON: {
      return {
        ...state,
        centerOnCursor: false,
        ...getUserAction(UserActionType.ContextButtonClick, action.buttonName, action.itemId)
      };
    }
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.verticallayoutorganizationalchart && globalState.verticallayoutorganizationalchart.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get(`/load-demoorganizationalchart?name=${chartName}`)
  };
}

export function setCursorItem(cursorItem) {
  return {
    type: SETCURSORITEM,
    cursorItem
  };
}

export function setSelectedItems(selectedItems = []) {
  return {
    type: SETSELECTEDITEMS,
    selectedItems
  };
}

export function setClickedButton(buttonName, itemId) {
  return {
    type: SETCLICKEDBUTTON,
    buttonName,
    itemId
  };
}

export function setConfigOption(name, value) {
  return {
    type: SETCONFIGOPTION,
    name,
    value
  };
}

export function setTemplateOption(templateName, name, value) {
  return {
    type: SETTEMPLATEOPTION,
    templateName,
    name,
    value
  };
}

export function switchLTR(isLTR) {
  return {
    type: SWITCHLTR
  };
}

export function loadMarkdown() {
  return {
    types: [LOAD_MARKDOWN, LOAD_MARKDOWN_SUCCESS, LOAD_MARKDOWN_FAIL],
    promise: ({ client }) => client.get(`/load-markdown?name=info-${chartName}`)
  };
}
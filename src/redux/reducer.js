// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import auth from './modules/auth';
import notifs from './modules/notifs';
import tutorialOrgDiagram from './modules/TutorialOrgDiagram';
import preloadOrgDiagram from './modules/PreloadOrgDiagram';
import largeorganizationalchart from './modules/demos/largeorganizationalchart';
import highlightannotations from './modules/demos/highlightannotations';
import partners from './modules/demos/partners';
import dynamicloading from './modules/demos/dynamicloading';
import verticallayoutorganizationalchart from './modules/demos/verticallayoutorganizationalchart';
import crossteamgroup from './modules/demos/crossteamgroup';
import familychartwithannotations from './modules/demos/familychartwithannotations';
import orgeditor from './modules/demos/orgeditor';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    online: (v = true) => v,
    notifs,
    auth,
    tutorialOrgDiagram,
    preloadOrgDiagram,
    partners,
    largeorganizationalchart,
    dynamicloading,
    verticallayoutorganizationalchart,
    highlightannotations,
    crossteamgroup,
    familychartwithannotations,
    orgeditor,
    ...asyncReducers
  };
}

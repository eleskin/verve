import App from './App';
import Verve from '../verve/Verve';

const app = Verve.render('#root', new App({}));

// app.children[1].handlers.click();
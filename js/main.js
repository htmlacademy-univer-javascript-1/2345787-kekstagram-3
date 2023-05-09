import {drawPictures} from './draw.js';
import { getData , showServerDataErrorMessage} from './connectionServer.js';

getData(drawPictures, showServerDataErrorMessage);

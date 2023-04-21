import {drawPictures} from './draw.js';
import { getData , errorNotification} from './connectionServer.js';

getData(drawPictures, errorNotification);

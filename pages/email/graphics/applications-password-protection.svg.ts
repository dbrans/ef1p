/*
Author: Kaspar Etter (https://kasparetter.com/)
Work: Explained from First Principles (https://ef1p.com/)
License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
*/

import { P } from '../../../code/svg/utility/point';

import { VisualElement } from '../../../code/svg/elements/element';
import { Line } from '../../../code/svg/elements/line';
import { Rectangle } from '../../../code/svg/elements/rectangle';
import { printSVG } from '../../../code/svg/elements/svg';
import { bold, colorize, estimateTextSizeWithMargin, estimateTextWidthWithMargin, T } from '../../../code/svg/elements/text';

const clientText = [bold('Client'), 'of user'];
const serverText = [T(bold('Server'), ' of provider'), colorize('pink', 'hash(Password + Salt) = Hash?')];
const databaseText = [bold('Database'), 'of provider'];
const passwordText = 'Password';
const saltText = 'Salt, Hash';
const color = 'blue'

const elements = new Array<VisualElement>();

const clientSize = estimateTextSizeWithMargin(clientText);
const clientRectangle = new Rectangle({ position: P(0, 0), size: clientSize });
elements.push(...clientRectangle.withText(clientText));

const serverSize = estimateTextSizeWithMargin(serverText);
const serverRectangle = new Rectangle({ position: P(clientSize.x + estimateTextWidthWithMargin(passwordText, 3), 0), size: serverSize });
elements.push(...serverRectangle.withText(serverText));

const databaseSize = estimateTextSizeWithMargin(databaseText);
const databaseRectangle = new Rectangle({ position: P(serverRectangle.props.position.x + serverSize.x + estimateTextWidthWithMargin(saltText, 3), 0), size: databaseSize });
elements.push(...databaseRectangle.withText(databaseText));

elements.unshift(...Line.connectBoxes(clientRectangle, 'right', serverRectangle, 'left', { color }).withText(passwordText));
elements.unshift(...Line.connectBoxes(databaseRectangle, 'left', serverRectangle, 'right', { color }).withText(saltText, 'right'));

printSVG(...elements);

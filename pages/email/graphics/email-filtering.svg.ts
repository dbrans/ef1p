import { P } from '../../../code/svg/utility/point';

import { VisualElement } from '../../../code/svg/elements/element';
import { Line } from '../../../code/svg/elements/line';
import { Rectangle } from '../../../code/svg/elements/rectangle';
import { printSVG } from '../../../code/svg/elements/svg';
import { bold, estimateTextSizeWithMargin } from '../../../code/svg/elements/text';

const mailClientOfSenderText = [bold('Mail client'), 'of sender'];
const outgoingMailServerOfSenderText = [bold('Outgoing'), bold('mail server'), 'of sender'];
const incomingMailServerOfRecipientText = [bold('Incoming'), bold('mail server'), 'of recipient'];
const offlineMailClientOfRecipientText = [bold('Offline'), bold('mail client'), 'of recipient'];
const onlineMailClientOfRecipientText = [bold('Online'), bold('mail client'), 'of recipient'];

const size = estimateTextSizeWithMargin(incomingMailServerOfRecipientText);
const horizontalGap = size.x / 2;
const verticalGap = size.y / 4;
const color = 'gray';

const elements = new Array<VisualElement>();

const mailClientOfSenderBox = new Rectangle({ position: P(0, 0), size });
elements.push(mailClientOfSenderBox, mailClientOfSenderBox.text(mailClientOfSenderText));

const outgoingMailServerOfSenderBox = new Rectangle({ position: P(size.x + horizontalGap, 0), size });
elements.push(outgoingMailServerOfSenderBox, outgoingMailServerOfSenderBox.text(outgoingMailServerOfSenderText));

const incomingMailServerOfRecipientBox = new Rectangle({ position: P(2 * (size.x + horizontalGap), 0), size, color: 'green' });
elements.push(incomingMailServerOfRecipientBox, incomingMailServerOfRecipientBox.text(incomingMailServerOfRecipientText));

const offlineMailClientOfRecipientBox = new Rectangle({ position: P(3 * (size.x + horizontalGap), -(size.y + verticalGap) / 2), size, color });
elements.push(offlineMailClientOfRecipientBox, offlineMailClientOfRecipientBox.text(offlineMailClientOfRecipientText));

const onlineMailClientOfRecipientBox = new Rectangle({ position: P(3 * (size.x + horizontalGap), (size.y + verticalGap) / 2), size, color: 'blue' });
elements.push(onlineMailClientOfRecipientBox, onlineMailClientOfRecipientBox.text(onlineMailClientOfRecipientText));

elements.unshift(Line.connectBoxes(mailClientOfSenderBox, 'right', outgoingMailServerOfSenderBox, 'left'));
elements.unshift(Line.connectBoxes(outgoingMailServerOfSenderBox, 'right', incomingMailServerOfRecipientBox, 'left'));
elements.unshift(Line.connectBoxes(incomingMailServerOfRecipientBox, 'right', offlineMailClientOfRecipientBox, 'left', { color }));
elements.unshift(Line.connectBoxes(incomingMailServerOfRecipientBox, 'right', onlineMailClientOfRecipientBox, 'left'));

printSVG(...elements);

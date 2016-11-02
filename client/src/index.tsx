import './typings/webpack-require';
const phoenix = require<any>('phoenix-socket');

let socket = new phoenix.Socket('ws://localhost:4000/socket', {
  logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data); }),
});
socket.connect({user_id: '123'});
socket.onOpen( ev => console.log('OPEN', ev) );
socket.onError( ev => console.log('ERROR', ev) );
socket.onClose( e => console.log('CLOSE', e));

const chan = socket.channel('rooms:lobby', {});
chan.join().receive('ignore', () => console.log('auth error'))
           .receive('ok', () => console.log('join ok'));
chan.onError(e => console.log('something went wrong', e));
chan.onClose(e => console.log('channel closed', e));
chan.push('new:msg', {});

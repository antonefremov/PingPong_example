pragma solidity 0.4.24;

contract PingPong {
  event Pong(address _pinger);
  function ping() public {
    emit Pong(msg.sender);
  }
}

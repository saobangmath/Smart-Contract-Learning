pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;

    /**
        msg is the global variable;
     */
    function Lottery() public{
        manager = msg.sender; 
    }

    function enter() public payable{
        require(msg.value >= .01 ether); // a pre-check condition;
        players.push(msg.sender);   
    }

    function random() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }   

    function pickWinner() public requireSenderTobeManager{
        uint pickedIndex = random() % players.length;
        players[pickedIndex].transfer(this.balance);
    
        players = new address[](0); // reset players array;
    }

    modifier requireSenderTobeManager(){
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]){
        return players;
    }
}   
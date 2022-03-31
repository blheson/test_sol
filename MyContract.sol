//SPDX-License-Identifier: MIT

pragma solidity >=0.4.16 <0.9.0;

contract MyContract {
    // State Variables
    uint32 myData;

    //setter
    function set(uint32 data) public {
        myData = data;
    }

    //getter
    function get() public view returns (uint32) {
        return myData;
    }
}

// Prototype for ANZ
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WheatTrade is ERC721, Ownable {
    uint256 public nextOrderId;
    address public farmer;

    struct Invoice {
        uint256 orderId;
        uint256 quantity;
        uint256 price;
        bool isAccepted;
    }

    mapping(uint256 => Invoice) public invoices;
    mapping(address => uint256[]) private bakerOrders;

    event WheatShipped(uint256 indexed orderId, address indexed baker, uint256 quantity, uint256 price);
    event WheatAccepted(uint256 indexed orderId, address indexed baker);

    constructor() ERC721("WheatInvoice", "WINV") Ownable(msg.sender){
        // redundant - for clarity
        farmer = msg.sender;
        nextOrderId = 1;
    }

    function shipWheat(address baker, uint256 quantity, uint256 price) external onlyOwner {
        uint256 orderId = nextOrderId++;
        Invoice memory newInvoice = Invoice(orderId, quantity, price, false);
        invoices[orderId] = newInvoice;
        bakerOrders[baker].push(orderId);

        emit WheatShipped(orderId, baker, quantity, price);
    }

    function acceptWheat(uint256 orderId) external {
        Invoice storage invoice = invoices[orderId];

        require(invoice.orderId != 0, "Order does not exist");
        require(!invoice.isAccepted, "Order already accepted");
        require(contains(bakerOrders[msg.sender], orderId), "Unauthorized baker");

        invoice.isAccepted = true;
        emit WheatAccepted(orderId, msg.sender);
    }

    function mintInvoice(uint256 orderId) external onlyOwner {
        Invoice storage invoice = invoices[orderId];

        require(invoice.isAccepted, "Invoice must be accepted by baker");
        _mint(msg.sender, orderId);
    }

    function getBakerOrders(address baker) external view returns (uint256[] memory) {
        return bakerOrders[baker];
    }

    function contains(uint256[] storage array, uint256 value) internal view returns (bool) {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    }
}

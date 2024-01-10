// Prototype for ANZ
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WheatTrade is ERC721, Ownable {
    uint256 public nextInvoiceId;
    address public farmer;

    struct Invoice {
        uint256 invoiceId; // for clarity
        uint256 orderId; // for clarity
        uint256 quantity;
        uint256 price;
        bool isAccepted;
    }

    mapping(uint256 => Invoice) public invoices;
    mapping(address => uint256[]) private bakerOrders;
    mapping(uint256 => uint256) private orderIdToInvoiceId;

    event WheatShipped(uint256 indexed invoiceId, uint256 indexed orderId, address indexed baker, uint256 quantity, uint256 price);
    event WheatAccepted(uint256 indexed invoiceId, address indexed baker);

    constructor() ERC721("WheatInvoice", "WINV") Ownable(msg.sender){
        // redundant - for clarity
        farmer = msg.sender;
        nextInvoiceId = 1;
    }

    function shipWheat(address baker, uint256 orderId, uint256 quantity, uint256 price) external onlyOwner returns (uint) {
        uint256 invoiceId = nextInvoiceId++;
        Invoice memory newInvoice = Invoice(invoiceId, orderId, quantity, price, false);
        invoices[invoiceId] = newInvoice;
        bakerOrders[baker].push(invoiceId);
        orderIdToInvoiceId[orderId] = invoiceId;
        
        emit WheatShipped(invoiceId, orderId, baker, quantity, price);
        return invoiceId;
    }

    function acceptWheat(uint256 invoiceId) external {
        Invoice storage invoice = invoices[invoiceId];

        require(invoice.invoiceId != 0, "Order does not exist");
        require(!invoice.isAccepted, "Order already accepted");
        require(contains(bakerOrders[msg.sender], invoiceId), "Unauthorized baker");

        invoice.isAccepted = true;
         _mint(farmer, invoiceId);
        emit WheatAccepted(invoiceId, msg.sender);
    }

    // function mintInvoice(uint256 invoiceId) external onlyOwner {
    //     Invoice storage invoice = invoices[invoiceId];

    //     require(invoice.isAccepted, "Invoice must be accepted by baker");
    //     _mint(msg.sender, invoiceId);
    // }

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

      function getInvoiceIdByOrderId(uint256 orderId) external view returns (uint256) {
        uint256 invoiceId = orderIdToInvoiceId[orderId];
        require(invoiceId != 0, "Invoice for this order ID does not exist");
        return invoiceId;
    }
}

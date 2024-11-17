// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EasyPropertyDeals {
    struct Property {
        uint256 id;
        address owner;
        uint256 price;
        bool isListed;
        bool isAuctionStarted;
        uint256 auctionEndTime;
        address highestBidder;
        uint256 highestBid;
    }

    uint256 public propertyCounter = 0;
    mapping(uint256 => Property) public properties;

    event PropertyListed(uint256 propertyId, address owner, uint256 price);
    event PaymentReceived(uint256 propertyId, address buyer, uint256 amount);
    event OwnershipTransferred(uint256 propertyId, address from, address to);
    event PriceChanged(uint256 propertyId, uint256 newPrice);
    event AuctionStarted(
        uint256 propertyId,
        uint256 startingPrice,
        uint256 auctionEndTime
    );
    event NewHighestBid(uint256 propertyId, address bidder, uint256 amount);
    event AuctionEnded(uint256 propertyId, address winner, uint256 winningBid);

    modifier onlyOwner(uint256 _propertyId) {
        require(
            properties[_propertyId].owner == msg.sender,
            "Not the property owner"
        );
        _;
    }

    modifier isListed(uint256 _propertyId) {
        require(properties[_propertyId].isListed, "Property is not listed");
        _;
    }


   modifier validPayment(uint256 _propertyId) {
        
        uint256 price = properties[_propertyId].price;

        require(msg.value >= price, "Insufficient payment amount ");
        require(msg.value <= price, "Overpayment not allowed");
        _;
    }


    modifier isAuctionStarted(uint256 _propertyId) {
        require(
            properties[_propertyId].isAuctionStarted,
            "Property is not in auction mode"
        );
        _;
    }

    modifier auctionActive(uint256 _propertyId) {
        require(
            block.timestamp <= properties[_propertyId].auctionEndTime,
            "Auction has ended"
        );
        _;
    }

    modifier auctionEnded(uint256 _propertyId) {
        require(
            block.timestamp > properties[_propertyId].auctionEndTime,
            "Auction is still active"
        );
        _;
    }

    /// @dev Function to list a property for sale
    function listProperty(uint256 _price) public {
        require(_price > 0, "Price must be greater than zero");

        propertyCounter++;
        properties[propertyCounter] = Property({
            id: propertyCounter,
            owner: msg.sender,
            price: _price,
            isListed: true,
            isAuctionStarted: false,
            auctionEndTime: 0,
            highestBidder: address(0),
            highestBid: 0
        });

        emit PropertyListed(propertyCounter, msg.sender, _price);
    }

    /// @dev Function to buy a listed property
function buyProperty(uint256 _propertyId, uint256 _propertyPrice) 
    public 
    payable 
    isListed(_propertyId) 
{
    Property storage property = properties[_propertyId];

    // Ensure the caller is not the owner of the property
    require(msg.sender != property.owner, "Owner cannot buy their own property");

    // Ensure the sent value matches the specified property price
    require(_propertyPrice == _propertyPrice, "Sent value does not match the property price");

    // Ensure the specified price matches the listed price of the property
    require(_propertyPrice == property.price, "Incorrect property price provided");

    // Transfer funds to the property owner
    payable(property.owner).transfer(msg.value);

    // Transfer ownership to the buyer and delist the property
    address previousOwner = property.owner;
    property.owner = msg.sender;
    property.isListed = false;

    // Emit necessary events
    emit PaymentReceived(_propertyId, msg.sender, msg.value);
    emit OwnershipTransferred(_propertyId, previousOwner, msg.sender);
}


event DebugInfo(uint256 propertyPrice, uint256 msgValue, address owner);

    /// @dev Function to change the price of a listed property
    function changePrice(uint256 _propertyId, uint256 _newPrice)
        public
        onlyOwner(_propertyId)
        isListed(_propertyId)
    {
        require(_newPrice > 0, "Price must be greater than zero");

        properties[_propertyId].price = _newPrice;

        emit PriceChanged(_propertyId, _newPrice);
    }

    /// @dev Function to start an auction
    function startAuction(
        uint256 _propertyId,
        uint256 _startingPrice,
        uint256 _duration
    ) public onlyOwner(_propertyId) isListed(_propertyId) {
        require(_startingPrice > 0, "Starting price must be greater than zero");
        require(_duration > 0, "Auction duration must be greater than zero");

        Property storage property = properties[_propertyId];
        property.isAuctionStarted = true;
        property.price = _startingPrice;
        property.auctionEndTime = block.timestamp + _duration;

        emit AuctionStarted(
            _propertyId,
            _startingPrice,
            property.auctionEndTime
        );
    }

    /// @dev Function to bid in an auction
    function bid(uint256 _propertyId, uint256 _bidPrice)
        public
        payable
        isAuctionStarted(_propertyId)
        auctionActive(_propertyId)
    {
        Property storage property = properties[_propertyId];
        property.isListed = false;
        // Validate the bid price matches the value sent with the transaction
        require(
            msg.value != _bidPrice,
            "Sent value does not match the bid price"
        );

        // Ensure the bid is higher than the current highest bid
        require(
            _bidPrice > property.highestBid,
            "Bid amount must be higher than the current highest bid"
        );

        // Refund the previous highest bidder
        if (property.highestBidder != address(0)) {
            payable(property.highestBidder).transfer(property.highestBid);
        }

        // Update the highest bid and the highest bidder
        property.highestBidder = msg.sender;
        property.highestBid = _bidPrice;

        emit NewHighestBid(_propertyId, msg.sender, _bidPrice);
    }

    /// @dev Function to end an auction
    function endAuction(uint256 _propertyId) public isAuctionStarted(_propertyId) auctionActive(_propertyId) {
    Property storage property = properties[_propertyId];

    // Ensure only the property owner can end the auction
    require(msg.sender == property.owner, "Only the property owner can end the auction");

    // Check if the auction time has ended
    require(block.timestamp >= property.auctionEndTime, "Auction has not ended yet");

    // Handle the case when there are no bids
    if (property.highestBidder == address(0)) {
        property.isListed = false; // Delist the property
        emit AuctionEnded(_propertyId, address(0), 0);
        return;
    }

    // Transfer funds to the property owner
    payable(property.owner).transfer(property.highestBid);

    // Transfer ownership to the highest bidder
    address previousOwner = property.owner;
    property.owner = property.highestBidder;

    // Delist the property and mark the auction as ended
    property.isListed = false;
    property.highestBidder = address(0); // Reset the highest bidder
    property.highestBid = 0; // Reset the highest bid

    emit AuctionEnded(_propertyId, previousOwner, propertyCounter);
    emit OwnershipTransferred(_propertyId, previousOwner, property.owner);
}

    /// @dev Function for auto price adjustment
    function autoPriceAdjust(
        uint256 _propertyId,
        uint256 _decrement,
        uint256 _interval
    ) public onlyOwner(_propertyId) isListed(_propertyId) {
        require(_decrement > 0, "Decrement must be greater than zero");
        require(_interval > 0, "Interval must be greater than zero");

        Property storage property = properties[_propertyId];
        uint256 adjustedPrice = property.price -
            _decrement *
            ((block.timestamp - property.auctionEndTime) / _interval);

        if (adjustedPrice > 0) {
            property.price = adjustedPrice;
            emit PriceChanged(_propertyId, adjustedPrice);
        }
    }
}

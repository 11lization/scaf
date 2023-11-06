pragma solidity ^0.8.9;

contract Storage {
    struct Point {
        bytes32 x;
        bytes32 y;
    }

    mapping(address => Point) public commitmentMap;

    function test(Point memory p1, Point memory p2, uint256 r) public view {
        r =
            uint256(keccak256(abi.encodePacked(r))) %
            21888242871839275222246405745257275088548364400416034343698204186575808495617;
        addPoints(p1, p2);
        multiplyPoint(p1, r);
    }

    function setCommitment(address _addr, Point memory _commitment) public {
        commitmentMap[_addr] = _commitment;
    }

    function getCommitment(address _addr) public view returns (Point memory) {
        return commitmentMap[_addr];
    }

    function addPoints(
        Point memory p1,
        Point memory p2
    ) public view returns (Point memory) {
        Point memory result;

        assembly {
            // Free memory pointer
            let ptr := mload(0x40)

            // Store p1.x and p1.y in memory
            mstore(ptr, mload(p1))
            mstore(add(ptr, 0x20), mload(add(p1, 0x20)))

            // Store p2.x and p2.y in memory
            mstore(add(ptr, 0x40), mload(p2))
            mstore(add(ptr, 0x60), mload(add(p2, 0x20)))

            // Precompiled contract (0x06)
            // p1.x, p1.y, p2.x, p2.y
            let success := staticcall(gas(), 0x06, ptr, 0x80, ptr, 0x40)

            // Check for success
            if iszero(success) {
                revert(0, 0)
            }

            // Load the result
            mstore(result, mload(ptr))
            mstore(add(result, 0x20), mload(add(ptr, 0x20)))
        }

        return result;
    }

    function multiplyPoint(
        Point memory point,
        uint256 scalar
    ) public view returns (Point memory) {
        Point memory result;
        assembly {
            // Free memory pointer
            let ptr := mload(0x40)

            // Store point.x and point.y in memory
            mstore(ptr, mload(point))
            mstore(add(ptr, 0x20), mload(add(point, 0x20)))

            // Store scalar in memory
            mstore(add(ptr, 0x40), scalar)

            // Precompiled contract (0x07)
            // point.x, point.y, scalar
            let success := staticcall(gas(), 0x07, ptr, 0x60, ptr, 0x40)

            // Check for success
            if iszero(success) {
                revert(0, 0)
            }

            // Load the result
            mstore(result, mload(ptr))
            mstore(add(result, 0x20), mload(add(ptr, 0x20)))
        }

        return result;
    }

    // Function to construct the group addtion binary tree
    function constructTree(
        Point[] memory leafNodes
    ) internal view returns (Point[] memory) {
        //1838996
        uint256 nodeCount = leafNodes.length;
        uint256 totalNodes = nodeCount * 2 - 1;
        Point[] memory tree = new Point[](totalNodes);
        //2290146

        // Fill the leaf nodes
        for (uint256 i = 0; i < nodeCount; i++) {
            tree[nodeCount - 1 + i] = leafNodes[i];
        }
        //2970114

        // Calculate parent nodes using group addition
        for (uint256 i = nodeCount - 1; i > 0; i--) {
            tree[i - 1] = addPoints(tree[2 * i - 1], tree[2 * i]);
        }
        //5067682
        return tree;
    }

    function calculateEvenIndexedNodesSum(
        Point[] memory nodes,
        uint256 scalar
    ) internal view returns (Point memory sum) {
        sum = Point({x: 0, y: 0});
        for (uint256 i = 1; i < nodes.length; i += 2) {
            sum = addPoints(sum, nodes[i]);
        }
        sum = multiplyPoint(sum, scalar);
        return sum;
    }

    function layerWiseMultiplication(
        Point[] memory leafNodes,
        uint256 r
    ) external view returns (Point memory) {
        //1838378
        Point[] memory tree = constructTree(leafNodes);
        //5067070
        // r =
        //     uint256(keccak256(abi.encodePacked(r))) %
        //     21888242871839275222246405745257275088548364400416034343698204186575808495617;
        // Point memory result = calculateEvenIndexedNodesSum(leafNodes, r);
        // uint256 currentScalar = r;
        // uint256 layerSize = leafNodes.length / 2;
        // //5677766
        // for (; layerSize >= 1; ) {
        //     Point[] memory layerNodes = new Point[](layerSize);
        //     //6035014
        //     for (uint256 i = 0; i < layerSize; ++i) {
        //         layerNodes[i] = tree[layerSize - 1 + i];
        //     }
        //     //6710636
        //     currentScalar = mulmod(
        //         currentScalar,
        //         currentScalar,
        //         21888242871839275222246405745257275088548364400416034343698204186575808495617
        //     );
        //     //6711026
        //     Point memory layerSum = calculateEvenIndexedNodesSum(
        //         layerNodes,
        //         currentScalar
        //     );
        //     result = addPoints(result, layerSum);
        //     //7435850
        //     layerSize = layerSize / 2;
        // }
        // return addPoints(result, leafNodes[0]);
        return leafNodes[0];
    }

    function precomputePowersOfR(
        uint256 r
    ) internal pure returns (uint256[] memory powers) {
        uint256 maxPower = 12;
        powers = new uint256[](maxPower + 1);
        powers[0] = r;

        for (uint256 i = 1; i <= maxPower; i++) {
            powers[i] = mulmod(
                powers[i - 1],
                powers[i - 1],
                21888242871839275222246405745257275088548364400416034343698204186575808495617
            );
        }
    }

    function computeScalarForIndex(
        uint256 index,
        uint256[] memory powersOfR
    ) internal pure returns (uint256 scalar) {
        scalar = 0;
        uint256 i = 0;
        while (index > 0) {
            if (index & 1 == 1) {
                scalar = addmod(
                    scalar,
                    powersOfR[i],
                    21888242871839275222246405745257275088548364400416034343698204186575808495617
                );
            }
            index >>= 1;
            i++;
        }
    }

    function batchScalarMultiply(
        Point[] memory points,
        uint256 r
    ) external view returns (Point memory) {
        //1838952
        uint256[] memory powersOfR = precomputePowersOfR(r);
        //1848624
        Point memory result = points[0];

        for (uint256 i = 1; i < points.length; i++) {
            uint256 scalar = computeScalarForIndex(i, powersOfR); // 인덱스는 1부터 시작한다고 가정
            //4615473
            result = addPoints(result, multiplyPoint(points[i], scalar));
            //12204788()
        }

        return result;
    }
}

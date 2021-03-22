# Storage & Memory
- sometimes references where our contract stores data (ex. HDD)
- sometimes references how our solidity variables store values (ex. RAM)
  - when use _storage_ variable, it makes var point to same array as right side of '='
    - ex. myArray and numbers now point to the same array
        ```
        contract Numbers {
            int[] public numbers;

            function Numbers() public {
                numbers.push(20);
                numbers.push(32);

                int[] storage myArray = numbers;
            }
        }
        ```
        does not point to the same array, points to a copy
        ```
        contract Numbers {
            int[] public numbers;

            function Numbers() public {
                numbers.push(20);
                numbers.push(32);

                int[] myArray = numbers;
            }
        }
        ```
    - when use _memory_ variable, points to a copy of right side of '='
      - ex. now when we update numbers it doesn't change the myArray values
        ```
            int[] memory myArray = numbers;
            numbers[0] = 1; // [1, 32]
        ```
        myArray is still [20, 32]

## mappings with solidity
- keys are not stored with mappings
  - data structure is a hash table
  - must provide key before hand
    - key given, gets hashed, turns out index and gets val at index
  - therefore, cannot get a list of keys
  - values are not iterable (cannot loop through values of a mapping)
  - good for single mapping lookups only
  - "all values exist" so if you give a key that doesn't exist, it returns a default value
        ex. string returns ''
            number returns 0
            etc.
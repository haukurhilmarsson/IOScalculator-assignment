# IOScalculator-assignment
Assignment to mimic the IOS calculator without landscape mode.

1. If you don't have expo-cli, install it in terminal with "npm install --global expo-cli"
2. Clone this repo with https://github.com/haukurhilmarsson/IOScalculator-assignment.git to an empty folder using terminal
3. Navigate to that remote repo in terminal
4. type "npm install" this will install node modules
5. type "npm start" this will open up a window from which you can view the app
6. Scan QR code and open app "expo go" (recommended) / open up a simulator

Functionality:

- Add digits to calculate (1 2 3 4 5 6 7 8 9 0)
- Clear the display (AC)
- Equals (=)
- Binary Operators (+ - x /)
- Unary Operator (%)
- Negation (+/-)
- Decimal (.)
- Backspace (swipe on output display), implemented with https://reactnative.dev/docs/panresponder

The display allows a maximum of 9 digits to appear. When the amount of digits exceed 6, fontSize will decrease in order to fit more digits.

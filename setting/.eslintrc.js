module.exports = {
    rules: {
        "no-extra-semi": "error",
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended", // tell eslint that we use React&JSX syntax
        "eslint-config-prettier", // turns off eslint settings that collide with prettier settings
    ],
    env: {
        "browser": true, // tell eslint that we write for browser
        "node": true,
        "amd": true,
    },
    parser : "babel-eslint",
}

// "npx eslint src/index.js" runs eslint
// "npx prettier src/index.js" runs prettier printing results on console
// adding "--write" flags makes prettier rewrite the code
// "npx prettier src/index.js --write && npx eslint src/index.js --fix" executes both eslint and prettier
// eslint is turned on via WebStorm setting -> Preferences -> Languages & Frameworks -> JavaScript ->
// Code Quality Tools -> ESLint -> Automatic ESLint Configuration
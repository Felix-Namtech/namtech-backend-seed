module.exports = {
    "extends": "google",
    "parser": "typescript-eslint-parser",
    "env": {
        "browser": true,
        "mocha": true,
        "node": true,
        "es6": true
    },
    "rules": {
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "require-jsdoc": "off",
        "valid-jsdoc": "off",
        "max-len": "off",
        "curly": "off",
        "arrow-parens": "off",
        "comma-dangle": "off",
        "linebreak-style": "off"
        // "quotes": ["error", "double"]
    },
    "parserOptions": {
        "sourceType": "module"
    }
};
module.exports = {
    extends: ["standard"],
    plugins: ["standard", "react"],
    rules: {
        "eqeqeq" : "warn",
        "no-var": "error", // optional, recommended when using es6+
        "no-unused-vars": 1, // recommended
        "arrow-spacing": ["error", { before: true, after: true }], // recommended
        indent: ["warn", 4],
        "comma-dangle": [
            "error",
            {
                objects: "only-multiline",
                arrays: "only-multiline",
                imports: "never",
                exports: "never",
                functions: "never",
            },
        ],

        // options to emulate prettier setup
        semi: ["error", "always"],
        "template-curly-spacing": ["error", "always"],
        "arrow-parens": ["error", "as-needed"],

        // standard.js
        "space-before-function-paren": [
            "error",
            {
                named: "always",
                anonymous: "always",
                asyncArrow: "always",
            },
        ],

        // standard plugin - options
        "standard/object-curly-even-spacing": ["error", "either"],
        "standard/array-bracket-even-spacing": ["error", "either"],
        "standard/computed-property-even-spacing": ["error", "even"],
        "standard/no-callback-literal": ["error", ["cb", "callback"]],

        // react plugin - options
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "no-tabs": 0

    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 8, // optional, recommended 6+
    }
}
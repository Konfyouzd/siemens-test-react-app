module.exports = {
	"extends": ["airbnb", "airbnb/hooks"],
	"parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "allowImportExportEverywhere": true
  },
  "env": {
      "es6": true,
      "browser": true,
      "node": true,
  },
  "rules": {
  	"object-curly-newline": ["error", {
  		"ObjectExpression": { "consistent": true }
  	}],
    "react/function-component-definition": 0,
    "react-hooks/rules-of-hooks": 0,
    "react/jsx-curly-spacing": 0,
    "no-multi-spaces": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "global-require": 0,
    'max-len': ["error", { "code": 135 }]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "app"]
      },
    }
  }
}

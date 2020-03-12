"use strict"
const utils = require("./utils")

module.exports = ({
  componentPath,
  componentName,
  fileName,
  semiColon,
  cssExtension,
  noTest,
  isFunctional,
}) =>
  utils.createTemplate(componentPath, {
    [`${fileName}.${cssExtension}`]:
      cssExtension === "sass"
        ? `
.${componentName}
    `
        : `
.${componentName} {}
  `,

    "index.js": `
export { default } from './${fileName}'${semiColon}
  `,

    [`${fileName}.test.js`]: noTest
      ? ""
      : `
import React from 'react'${semiColon}
import { shallow } from 'enzyme'${semiColon}

import ${componentName} from './${fileName}'${semiColon}

let component${semiColon}

beforeEach(() => {
  component = shallow(
    <${componentName} {...{}} />
  )${semiColon}
})${semiColon}

test('renders', () => {
  expect(component).toHaveLength(1)${semiColon}
})${semiColon}
  `,

    [`${fileName}.js`]: isFunctional
      ? `
import React from 'react'${semiColon}

import './${fileName}.${cssExtension}'${semiColon}

const ${componentName} = () => (
  <div className="${componentName}"></div>
)${semiColon}

${componentName}.propTypes = {}${semiColon}

export default ${componentName}${semiColon}

  `
      : `
import React, { Component } from 'react'${semiColon}
import './${fileName}.${cssExtension}'${semiColon}

class ${componentName} extends Component {
  state = {}${semiColon}

  render() {
    return (
      <div className="${componentName}"></div>
    )${semiColon}
  }
}

export default ${componentName}${semiColon}
  `,
  })

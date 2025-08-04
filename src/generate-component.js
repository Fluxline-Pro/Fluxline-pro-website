#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];
if (!componentName) {
  console.error('Please provide a component name.');
  process.exit(1);
}

const componentDir = path.join('src', 'theme', 'components', componentName);
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

const files = [
  {
    name: `${componentName}.tsx`,
    content: `import React from 'react';\nimport styles from './${componentName}.module.scss';\n\nexport const ${componentName} = () => {\n  return <div className={styles.root}>${componentName} works!</div>;\n};\n`,
  },
  {
    name: `${componentName}.module.scss`,
    content: `.root {\n  /* styles for ${componentName} */\n}\n`,
  },
  {
    name: `${componentName}.storybook.tsx`,
    content: `import React from 'react';\nimport { ${componentName} } from './${componentName}';\n\nexport default {\n  title: 'Components/${componentName}',\n  component: ${componentName},\n};\n\nexport const Default = () => <${componentName} />;\n`,
  },
  {
    name: `${componentName}.test.ts`,
    content: `import { render } from '@testing-library/react';\nimport { ${componentName} } from './${componentName}';\n\ntest('renders ${componentName}', () => {\n  render(<${componentName} />);\n});\n`,
  },
];

files.forEach((file) => {
  const filePath = path.join(componentDir, file.name);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, file.content);
    console.log(`Created ${filePath}`);
  } else {
    console.log(`Skipped ${filePath} (already exists)`);
  }
});

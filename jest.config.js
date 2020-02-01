module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  testRegex: ['src/.*\\.(test|spec)\\.[jt]sx?$'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  clearMocks: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

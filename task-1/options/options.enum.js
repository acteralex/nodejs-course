const OptionsEnum = {
  ACTION: {
    name: 'action',
    shortName: 'a',
    description: 'an action encode/decode'
  },
  SHIFT: {
    name: 'shift',
    shortName: 's',
    description: 'a shift',
    mapFn: parseInt
  },
  INPUT: {
    name: 'input',
    shortName: 'i',
    description: 'an input file'
  },
  OUTPUT: {
    name: 'output',
    shortName: 'o',
    description: 'an output file'
  }
};

module.exports = OptionsEnum;

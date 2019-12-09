const INSTRUCTIONS = {
  ADD: 1,
  MULT: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8,
  HALT: 99
}

function runProgram(instructions) {
  instructions = instructions.slice()

  return function* amplifier() {
    let lastOutput = null
    for (let i = 0; i < instructions.length; ++i) {
      const instruction = instructions[i]
      const parsed = String(instruction)
        .padStart(5, '0')
        .split('')
      const valueMode = (value, mode = '0') =>
        mode === '0' ? instructions[value] : value
      const opCode = Number(parsed.slice(3).join(''))
      const modes = parsed.slice(0, 3)
      switch (opCode) {
        case INSTRUCTIONS.ADD: {
          const x = valueMode(instructions[++i], modes[2])
          const y = valueMode(instructions[++i], modes[1])
          instructions[instructions[++i]] = x + y
          break
        }
        case INSTRUCTIONS.MULT: {
          const x = valueMode(instructions[++i], modes[2])
          const y = valueMode(instructions[++i], modes[1])
          instructions[instructions[++i]] = x * y
          break
        }
        case INSTRUCTIONS.INPUT: {
          instructions[instructions[++i]] = yield { type: 'INPUT' }
          break
        }
        case INSTRUCTIONS.OUTPUT: {
          lastOutput = valueMode(instructions[++i], modes[2])
          yield { type: 'OUTPUT', value: lastOutput }
          break
        }
        case INSTRUCTIONS.JUMP_IF_TRUE: {
          const compare = valueMode(instructions[++i], modes[2])
          const jumpTo = valueMode(instructions[++i], modes[1]) - 1
          if (compare != 0) {
            i = jumpTo
          }
          break
        }
        case INSTRUCTIONS.JUMP_IF_FALSE: {
          const compare = valueMode(instructions[++i], modes[2])
          const jumpTo = valueMode(instructions[++i], modes[1]) - 1
          if (compare == 0) {
            i = jumpTo
          }
          break
        }
        case INSTRUCTIONS.LESS_THAN: {
          const x = valueMode(instructions[++i], modes[2])
          const y = valueMode(instructions[++i], modes[1])
          instructions[instructions[++i]] = x < y ? 1 : 0
          break
        }
        case INSTRUCTIONS.EQUALS: {
          const x = valueMode(instructions[++i], modes[2])
          const y = valueMode(instructions[++i], modes[1])
          instructions[instructions[++i]] = x === y ? 1 : 0
          break
        }
        case INSTRUCTIONS.HALT:
          return lastOutput
      }
    }
  }
}

const permutations = inputArr => {
  let result = []

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice()
        let next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

function part1(instructions) {
  const allInputs = permutations([0, 1, 2, 3, 4])
  const results = allInputs.map(inputs => {
    const amplifiers = inputs.map((input, i) => {
      const amplifier = runProgram(instructions)()
      amplifier.next()
      // set phase
      const state = amplifier.next(input)
      const name = String.fromCharCode(i + 65)
      return { amplifier, state, name }
    })

    let power = 0

    for (const amp of amplifiers) {
      const { amplifier } = amp
      const out = amplifier.next(power)
      power = out.value.value
    }

    return power
  })

  return results.reduce((p, v) => Math.max(p, v), 0)
}

function part2(instructions) {
  const allInputs = permutations([9, 8, 7, 6, 5])
  const results = allInputs.map(inputs => {
    const amplifiers = inputs.map((input, i) => {
      const amplifier = runProgram(instructions)()
      amplifier.next()
      // set phase
      const state = amplifier.next(input)
      const name = String.fromCharCode(i + 65)
      return { amplifier, state, name }
    })

    let power = 0

    while (amplifiers[amplifiers.length - 1].state.done === false) {
      for (const amp of amplifiers) {
        const { amplifier } = amp
        const out = amplifier.next(power)
        // continue to next input
        amp.state = amplifier.next()
        power = out.done ? out.value : out.value.value
      }
    }

    return power
  })

  return results.reduce((p, v) => Math.max(p, v), 0)
}

if (process.argv[1] === __filename) {
  const input = require('fs')
    .readFileSync(0)
    .toString()

  const instructions = input.split(',').map(Number)

  const p1Max = part1(instructions)
  console.log(p1Max)

  const p2Max = part2(instructions)
  console.log(p2Max)
}
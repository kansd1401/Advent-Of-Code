let str = `#..#.#.#.######..#.#...##
##.#..#.#..##.#..######.#
.#.##.#..##..#.#.####.#..
.#..##.#.#..#.#...#...#.#
#...###.##.##..##...#..#.
##..#.#.#.###...#.##..#.#
###.###.#.##.##....#####.
.#####.#.#...#..#####..#.
.#.##...#.#...#####.##...
######.#..##.#..#.#.#....
###.##.#######....##.#..#
.####.##..#.##.#.#.##...#
##...##.######..##..#.###
...###...#..#...#.###..#.
.#####...##..#..#####.###
.#####..#.#######.###.##.
#...###.####.##.##.#.##.#
.#.#.#.#.#.##.#..#.#..###
##.#.####.###....###..##.
#..##.#....#..#..#.#..#.#
##..#..#...#..##..####..#
....#.....##..#.##.#...##
.##..#.#..##..##.#..##..#
.##..#####....#####.#.#.#
#..#..#..##...#..#.#.#.##`

let temp = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`

let temp1 = `.#..#
.....
#####
....#
...##`

let temp2 = `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`

let temp3 = `.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`

let temp_2 = `.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....#...###..
..#.#.....#....##`

let temp_3 = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`

let data = str.split("\n")
data = data.map(x => x.split(''))

const asteroidCounter = (arr) => {
  let asteroids = []
  for(x in data){
    for(y in data[x]){
      if(data[x][y] === "#"){
        asteroids.push([Number(y),-x])
      }
    }
  }
  let maxDetections = 0
  let result;
  for(point of asteroids){
    let [top,right,bot,left] = [0,0,0,0]
    let dirHits = 0
    let detections = 0;
    let lines = []
    let sides = {top:[],right:[],bot:[],left:[]}
    for(asteroid of asteroids){
      let exists = false
      let m = (point[1] - asteroid[1])/(point[0] - asteroid[0])
      let b = point[1] - (m*point[0])
      if(point[0] === asteroid[0] && point[1] === asteroid[1]){
        let big = "oof"
      }else if(point[0] === asteroid[0] && point[1] < asteroid[1]){
        top = 1
        sides.top.push(asteroid)
      }else if(point[1] === asteroid[1] && point[0] < asteroid[0]){
        right = 1
        sides.right.push(asteroid)
      }else if(point[0] === asteroid[0] && point[1] > asteroid[1]){
        bot = 1
        sides.bot.push(asteroid)
      }else if(point[1] === asteroid[1] && point[0] > asteroid[0]){
        left = 1
        sides.left.push(asteroid)
      }else{
        for(line of lines){
          if(line.m === m && line.b === b){
            if(point[1] < asteroid[1] === line.above){
              exists = true
              line.linedUp.push(asteroid)
            }
          }
        }
        if(!exists){
          if(point[1] < asteroid[1]){
            lines.push({m,b,above: true,linedUp: [[asteroid[0],asteroid[1]]]})
          }else{
            lines.push({m,b,above: false,linedUp: [[asteroid[0],asteroid[1]]]})
          }
          detections++
        }
      }
    }
    if(top){dirHits++}
    if(right){dirHits++}
    if(bot){dirHits++}
    if(left){dirHits++}
    detections+=dirHits
    if(detections > maxDetections){
      maxDetections = detections
      result = {station: [...point],sides: sides,lines:[...lines],length: asteroids.length}
    }
  }
  return result
}

const destroyerOfWorlds = (arr) => {
  let data = asteroidCounter(arr)
  console.log(data.length)
  let quarters = {q1: [],q2: [],q3: [],q4: []}
  if(data.sides.top.length){quarters.q1.push([...data.sides.top])}
  if(data.sides.right.length){quarters.q2.push([...data.sides.right])}
  if(data.sides.bot.length){quarters.q3.push([...data.sides.bot])}
  if(data.sides.left.length){quarters.q4.push([...data.sides.left])}

  for(line in data.lines){
    // console.log(`${data.lines[line].m} at ${data.lines[line].linedUp[0]}`)
    if(data.lines[line].m > 0 && data.lines[line].above){
      quarters.q1.push(data.lines[line].linedUp)
    }else  if(data.lines[line].m < 0 && !data.lines[line].above){
      quarters.q2.push(data.lines[line].linedUp)
    }else  if(data.lines[line].m > 0 && !data.lines[line].above){
      quarters.q3.push(data.lines[line].linedUp)
    }else  if(data.lines[line].m < 0 && data.lines[line].above){
      quarters.q4.push(data.lines[line].linedUp)
    }
  }
  //These two loops sort the points in each line
  for(lines of quarters.q1){
    lines = lines.reverse()
  }
  for(lines of quarters.q4){
    lines = lines.reverse()
  }
  // console.log("Q1")
  // console.log(quarters.q1)
  // console.log("Q2")
  // console.log(quarters.q2)
  // console.log("Q3")
  // console.log(quarters.q3)
  // console.log("Q4")
  // console.log(quarters.q4)
  // console.log("/////////////////////////////////////////////////")
  //Thses two loops sort the lines in each each
 
  quarters.q1.sort((a,b) => {
    if(a[0][0] === data.station[0]){
      return -1
    }
    if(b[0][0] === data.station[0]){
      return 1
    }
    let m1 = (data.station[1] - a[0][1])/(data.station[0] - a[0][0])
    let m2 = (data.station[1] - b[0][1])/(data.station[0] - b[0][0])
    if(m1 > m2){
      return -1
    }else{
      return 1
    }
  })
  quarters.q2.sort((a,b) => {
    if(a[0][1] === data.station[1]){
      return -1
    }
    if(b[0][1] === data.station[1]){
      return 1
    }
    let m1 = (data.station[1] - a[0][1])/(data.station[0] - a[0][0])
    let m2 = (data.station[1] - b[0][1])/(data.station[0] - b[0][0])
    if(m1 > m2){
      return -1
    }else{
      return 1
    }
  })
  quarters.q3.sort((a,b) => {
    if(a[0][0] === data.station[0]){
      return -1
    }
    if(b[0][0] === data.station[0]){
      return 1
    }
    let m1 = (data.station[1] - a[0][1])/(data.station[0] - a[0][0])
    let m2 = (data.station[1] - b[0][1])/(data.station[0] - b[0][0])
    if(m1 > m2){
      return -1
    }else{
      return 1
    }
  })
  quarters.q4.sort((a,b) => {
    if(a[0][1] === data.station[1]){
      return -1
    }
    if(b[0][1] === data.station[1]){
      return 1
    }
    let m1 = (data.station[1] - a[0][1])/(data.station[0] - a[0][0])
    let m2 = (data.station[1] - b[0][1])/(data.station[0] - b[0][0])
    if(m1 > m2){
      return -1
    }else{
      return 1
    }
  })
  let targets = []
  for(quarter in quarters){
    for(line of quarters[quarter]){
      targets.push(line)
    }
  }
  let count = 1
  let index = 0
  while(count < data.length){
    for(line of targets){
      if(line[index]){
        console.log(`${count}th asteroid destroyed at ${line[index]}`)
        count++
      }
    }
    index++
  }
}

destroyerOfWorlds([...data])


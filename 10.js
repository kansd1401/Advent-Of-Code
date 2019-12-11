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

let data = str.split("\n")
data = data.map(x => x.split(''))

const asteroidCounter = (arr) => {
  let asteroids = []
  for(x in data){
    for(y in data[x]){
      if(data[x][y] === "#"){
        asteroids.push([y,-x])
      }
    }
  }
  let maxDetections = 0
  let spot;
  for(point of asteroids){
    let [top,right,bot,left] = [0,0,0,0]
    let dirHits = 0
    let x = point[0]
    let y = point[1]
    let detections = 0;
    let lines = []
    for(asteroid of asteroids){
      let exists = false
      let mx = point[0] - asteroid[0]
      let my = point[1] - asteroid[1]
      let b = point[1] - ((my/mx)*point[0])
      if(point[0] === asteroid[0] && point[1] === asteroid[1]){
        let big = "oof"
      }else if(point[0] === asteroid[0] && point[1] > asteroid[1]){
        top = 1
      }else if(point[1] === asteroid[1] && point[0] < asteroid[0]){
        right = 1
      }else if(point[0] === asteroid[0] && point[1] < asteroid[1]){
        bot = 1
      }else if(point[1] === asteroid[1] && point[0] > asteroid[0]){
        left = 1
      }else{
        for(line of lines){
          if(line.mx/line.my === mx/my && line.b === b){
            if(point[1] > asteroid[1] === line.above){
              exists = true
            }
          }
        }
        if(!exists){
          if(point[1] > asteroid[1]){
            lines.push({mx,my,b,above: true,x: asteroid[0],y:asteroid[1]})
          }else{
            lines.push({mx,my,b,above: false,x: asteroid[0],y:asteroid[1]})
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
      spot = [...point]
    }
  }
  return `${maxDetections} at ${spot}`
}

console.log(asteroidCounter(data))


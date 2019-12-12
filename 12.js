let data = [[-7,-8,9],
[-12,-3,-4],
[6,-17,-9],
[4,-10,-6]]

let temp1 = [[-1,0,2],
[2,-10,-7],
[4,-8,8],
[3,5,-1]]

const moonStuff_1 = (moons) => {
  let moonPoints = [[[...moons[0]],[0,0,0]],[[...moons[1]],[0,0,0]],[[...moons[2]],[0,0,0]],[[...moons[3]],[0,0,0]]]
  for(let x = 0;x < 1000; x++){
    for(moon in moonPoints){
      for(let a = 0;a < 3; a++){
        let velocity = 0;
        for(comp in moonPoints){
          if(moon === comp){
            continue
          }
          if(moonPoints[moon][0][a] < moonPoints[comp][0][a]){
            velocity++
          }else if(moonPoints[moon][0][a] > moonPoints[comp][0][a]){
            velocity--
          }
        }
        moonPoints[moon][1][a] = moonPoints[moon][1][a]+(velocity)
      }
    }
    for(moon in moonPoints){
      for(let a = 0;a < 3; a++){
        moonPoints[moon][0][a] = moonPoints[moon][0][a] + moonPoints[moon][1][a]
      }
    }
  }
}


const moonStuff_2 = (moons) => {
  let start = [[[...moons[0]],[0,0,0]],[[...moons[1]],[0,0,0]],[[...moons[2]],[0,0,0]],[[...moons[3]],[0,0,0]]]
  let moonPoints = [[[...moons[0]],[0,0,0]],[[...moons[1]],[0,0,0]],[[...moons[2]],[0,0,0]],[[...moons[3]],[0,0,0]]]
  let found = false
  let x = 0
  while(!found){
    for(moon in moonPoints){
      for(let a = 0;a < 3; a++){
        let velocity = 0;
        for(comp in moonPoints){
          if(moon === comp){
            continue
          }
          if(moonPoints[moon][0][a] < moonPoints[comp][0][a]){
            velocity++
          }else if(moonPoints[moon][0][a] > moonPoints[comp][0][a]){
            velocity--
          }
        }
        moonPoints[moon][1][a] = moonPoints[moon][1][a]+(velocity)
      }
    }
    for(moon in moonPoints){
      for(let a = 0;a < 3; a++){
        moonPoints[moon][0][a] = moonPoints[moon][0][a] + moonPoints[moon][1][a]
      }
    }
    let inside = true
    for(moon in moonPoints){
      // do each axis by brute then calculate LCM
      for(let a = 2;a < 3; a++){
        if(moonPoints[moon][0][a] !== start[moon][0][a]){
          inside = false
        }
        if(moonPoints[moon][1][a] !== start[moon][1][a]){
          inside = false
        }
      }
    }
    x++
  }
  console.log(x)
}


moonStuff_2(data) ///306,798,770,391,636
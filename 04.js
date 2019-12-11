const range_min = 245318
const range_max = 765747

const criteriaCheck = () => {
  count = 0;
  for(let x = range_min; x <= range_max;x++){
    let num = x.toString().split('')
    let adj =false;
    let dec = true
    for(let y = 0; y<5;y++){
      if(num[y] === num [y+1]){
        if(y === 0){
          if(num[y] !== num[y+2]){
            adj = true
          }
        }
        if(y === 4){
          if(num[y] !== num[y-1]){
            adj = true
          }
        }
        if(num[y] !== num[y-1] && num[y] !== num[y+2]){
          adj = true
        }
      }
      if(num[y] > num[y+1]){
        dec = false
      }
    }
    if(adj && dec){
      count++
    }
  }
  return count
}

console.log(criteriaCheck())
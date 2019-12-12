let str = [3,8,1001,8,10,8,105,1,0,0,21,38,55,80,97,118,199,280,361,442,99999,3,9,101,2,9,9,1002,9,5,9,1001,9,4,9,4,9,99,3,9,101,5,9,9,102,2,9,9,1001,9,5,9,4,9,99,3,9,1001,9,4,9,102,5,9,9,101,4,9,9,102,4,9,9,1001,9,4,9,4,9,99,3,9,1001,9,3,9,1002,9,2,9,101,3,9,9,4,9,99,3,9,101,5,9,9,1002,9,2,9,101,3,9,9,1002,9,5,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99]

let temp1 = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]

let temp3 =[3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0]

let temp2 = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]


const opCoder = (arr,phase,value) => {
  let x=0
  let output;
  let phased = false
    while(x < arr.length){
      let instruction = arr[x].toString().split("").reverse()
      let op, firstParam, secondParam;
      if(Number(instruction[0]) === 9 && Number(instruction[1]) === 9){
        op = 99
      }else{
        op = Number(instruction[0])
      }
      if(Number(instruction[2])){
          firstParam = arr[x+1]
      }else{
          firstParam = arr[arr[x+1]]
      }

      if(Number(instruction[3])){
        secondParam = arr[x+2]
      }else{
        secondParam = arr[arr[x+2]]
      } 
      if(op===99){
        return [arr,output]
      }else if(op===1){
        arr[arr[x+3]] = firstParam + secondParam
        x+=4
      }else if(op===2){
        arr[arr[x+3]] = firstParam * secondParam
        x+=4
      }else if(op===3){
        if(!phased){
          arr[arr[x+1]] = phase
          phased = true
          x+=2
        }else{
          arr[arr[x+1]] = value
          x+=2
        }
      }else if(op===4){
        console.log("This is the result for the test:"+firstParam)
        output = firstParam
        x+=2
      }else if(op === 5){
        if(firstParam){
          x=secondParam
        }else{
          x+=3
        }
      }else if(op === 6){
        if(!firstParam){
          x=secondParam
        }else{
          x+=3
        }
      }else if(op === 7){
        if(firstParam < secondParam){
          arr[arr[x+3]] = 1
          x+=4
        }else{
          arr[arr[x+3]] = 0
          x+=4
        }
      }else if(op === 8){
        if(firstParam === secondParam){
          arr[arr[x+3]] = 1
          x+=4
        }else{
          arr[arr[x+3]] = 0
          x+=4
        }
      }else{
        return ("OP code is invalid")
      }
    }
}


const controller = (data,val) => {
  let sequence= [0,1,2,3,4]
  let max = 0;
  let input = val;
  for(a of sequence){
    for(b of sequence){
      if(a === b){
        continue
      }
      for(c of sequence){
        if(a === c || b === c){
          continue
        }
        for(d of sequence){
          if(a === d || b === d || c === d){
            continue
          }
          for(e of sequence){
            let phases = [a,b,c,d,e]
            if(a === e || b === e || c === e || d === e){
              continue
            }
            for(phase of phases){
              let result = opCoder([...data],phase,input)[1]
              input = result
            }
            if(input > max){
              max = input
            }
            input = val;
          }
        }
      }
    }
  }
  return max
  
}
console.log(controller(str,0))

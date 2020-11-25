interface recieveSumArray {
  candidates: Array<number>
  target: number
}
onmessage = async function(e:MessageEvent) {
  let recieve = e.data as recieveSumArray
  let candidates = recieve.candidates
  let target = recieve.target
  let filterCandidates = [...new Set(candidates)].sort((a, b) => a - b)
  const maxLength = Math.floor(target / Math.min(...filterCandidates))
  console.log('maxLength', maxLength)
  let result = handleFunction(candidates, target, 1, maxLength)
  let filterResult:Array<string> = []
  let finallyResult: Array<Array<number>> = []
  if(result) {
    for(let i=0;i<result.length;i++) {
      let JSONItem = JSON.stringify(result[i].sort((a, b) => a - b))
      if(filterResult.includes(JSONItem)) {
        continue
      }
      filterResult.push(JSONItem)
    }
    finallyResult = filterResult.map(item => JSON.parse(item)) as Array<Array<number>>
  }
  console.log('result', finallyResult)
  postMessage(finallyResult)
}
function handleFunction(candidates: Array<number>, target: number, nowDeep: number, maxDeep: number):Array<Array<number>> | null {
  if(nowDeep > maxDeep) {
    return null
  }
  let returnArray = []
  for(let i=0;i<candidates.length;i++) {
    if(candidates[i] === target) {
      returnArray.push([candidates[i]])
    } else {
      let newTarget = target - candidates[i]
      if(newTarget < 0) {
        continue
      }
      let newResult = handleFunction(candidates, newTarget, nowDeep + 1, maxDeep)
      if(!newResult) {
        continue
      }
      for(let j=0;j<newResult.length;j++) {
        let tempArray = [candidates[i], ...newResult[j]]
        returnArray.push(tempArray)
      }
    }
  }
  return returnArray
}
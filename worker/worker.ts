importScripts('./workerImportTest.js')
type recieve = Array<number>
onmessage = async function(e:MessageEvent) {
  let len1 = (e.data as recieve)[0]
  let len2 = (e.data as recieve)[1]
  let result = len1 + len2
  if(isNaN(result)) {
    postMessage('Please write two numbers')
  } else {
    console.log(1)
    let response:string = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("result " + result)
      }, 2000)
    })
    console.log("2", self.origin, test)
    postMessage(response)
  }
}
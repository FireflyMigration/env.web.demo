/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
declare const CefSharp
//@ts-ignore
declare const dotnet

let returnMockData = false
//@ts-ignore
if (window.cefSharp) CefSharp.BindObjectAsync('dotnet')
else returnMockData = true

export async function aButtonWasClicked(text: string): Promise<void> {
  if (returnMockData) {
    alert('Menu opened ' + text)
    return
  }
  return dotnet.test()
}

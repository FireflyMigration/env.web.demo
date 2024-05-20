/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
declare const CefSharp
//@ts-ignore
declare const dotnetBridge
//@ts-ignore
if (window.cefSharp) CefSharp.BindObjectAsync('dotnetBridge')
//@ts-ignore
export const dotnet = window.cefSharp
  ? (new Proxy(
      {},
      {
        get: (target, p) => {
          return dotnetBridge[p]
        },
      }
    ) as any)
  : undefined

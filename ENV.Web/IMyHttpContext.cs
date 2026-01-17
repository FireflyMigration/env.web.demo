
using ENV.IO;

namespace ENV.Web
{
    interface IMyHttpContext
    {
        string GetRequestParam(string key);
        WebRequest Request { get; }
        WebResponse Response { get; }
    }
    interface WebRequest
    {
        string HttpMethod { get; }
        string RawUrl { get; }
        string Path { get; }

        string this[string key] { get; }
        string GetRequestInputString();
    }
    interface WebResponse
    {
        string ContentType { get; set; }
        int StatusCode { set; }

        void AddHeader(string name, string value);
        void Write(string what);
    }

    class HttpContextBridgeToIHttpContext : IMyHttpContext
    {
        IWebContext _current;


        public HttpContextBridgeToIHttpContext(IWebContext current, bool postOnly, string HttpMethodParamName)
        {
            _current = current;
            Request = new WebReqestBridgeToRequest(current, HttpMethodParamName);
            if (postOnly)
                Request = new PostOnlyWebRequest(Request);
            Response = new WebResponseBridgeToResponse(current);
        }

        public WebRequest Request { get; private set; }

        public WebResponse Response { get; private set; }

        public string GetRequestParam(string key)
        {
            return _current[key];
        }
    }
    internal class WebReqestBridgeToRequest : WebRequest
    {
        IWebContext _request;
        string _httpMethodParamName;
        public WebReqestBridgeToRequest(IWebContext request, string httpMethodParamName)
        {
            _request = request;
            _httpMethodParamName = httpMethodParamName;
        }
        public string GetRequestInputString()
        {

            return _request.GetRequestBody();

        }

        public string HttpMethod
        {
            get
            {
                if (!string.IsNullOrEmpty(_httpMethodParamName))
                    return this[_httpMethodParamName] ?? "get";
                return _request.HttpMethod;
            }
        }

        public string RawUrl => _request.RawUrl;

        public string Path => _request.Path;

        public string this[string key] => _request[key];
    }
    internal class WebResponseBridgeToResponse : WebResponse
    {
        IWebContext _response;

        public WebResponseBridgeToResponse(IWebContext response)
        {
            _response = response;
        }

        public string ContentType { get => _response.ContentType; set => _response.ContentType = value; }
        public int StatusCode { set => _response.StatusCode = value; }

        public void AddHeader(string name, string value)
        {
            _response.AddHeader(name, value);
        }

        public void Write(string what)
        {
            _response.Write(what);
        }


    }

    class PostOnlyWebRequest : WebRequest
    {
        WebRequest _request;
        public PostOnlyWebRequest(WebRequest request)
        {
            _request = request;
        }

        public string this[string key] => _request[key];

        public string HttpMethod => _request.HttpMethod;

        public string RawUrl => _request.RawUrl;

        public string Path => _request.Path;

        public string GetRequestInputString()
        {
            return _request["body"];
        }
    }


}

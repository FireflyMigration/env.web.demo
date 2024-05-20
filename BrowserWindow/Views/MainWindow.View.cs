using CefSharp.WinForms;
using CefSharp;
using ENV;
using ENV.Data;
using Firefly.Box;
using Firefly.Box.UI.Advanced;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.IO;

namespace BrowserWindow.Views
{
    partial class MainWindowView : ENV.UI.Form
    {

        public MainWindowView(object operations)
        {
            InitializeComponent();
            FitToMDI = true;
            TitleBar = false;

            var browser = new ChromiumWebBrowser(@"http://localhost:5173/");
            //   browser.RequestHandler = new CustomRequestHandler(@"http://127.0.0.1:5173/", @"C:\try\t61\vite-project\dist");
            var loaded = false;
            browser.LoadingStateChanged += delegate
            {
                if (!loaded)
                {
                    //browser.ShowDevTools();
                }
                loaded = true;
            };
            this.Controls.Add(browser);
            browser.JavascriptObjectRepository.NameConverter = new CefSharp.JavascriptBinding.CamelCaseJavascriptNameConverter();
            browser.JavascriptObjectRepository.Register("dotnetBridge", operations, isAsync: true, options: BindingOptions.DefaultBinder);
        }



    }
}
namespace BrowserWindow
{
    public class MainWindow
    {
        public static void RunMenu(object operations)
        {
            new myUIC(operations).Run();

        }
        class myUIC : UIControllerBase
        {
            object _operations;
            public myUIC(object operations)
            {
                _operations = operations;
            }

            protected override void OnLoad()
            {
                View = () => new Views.MainWindowView(_operations);
                KeepViewVisibleAfterExit = true;
            }
            public void Run()
            {
                base.Execute();
            }
        }
    }

    class CustomRequestHandler : CefSharp.Handler.RequestHandler
    {
        string _url;
        string _distFolder;
        public CustomRequestHandler(string url, string distFolder)
        {
            _url = url;
            _distFolder = distFolder;
        }

        protected override IResourceRequestHandler GetResourceRequestHandler(IWebBrowser chromiumWebBrowser, IBrowser browser, IFrame frame, IRequest request, bool isNavigation, bool isDownload, string requestInitiator, ref bool disableDefaultHandling)
        {

            //Only intercept specific Url's
            if (request.Url.StartsWith(_url))
            {
                return new CustomResourceRequestHandler(this);
            }

            //Default behaviour, url will be loaded normally.
            return null;
        }
        public class CustomResourceRequestHandler : CefSharp.Handler.ResourceRequestHandler
        {
            CustomRequestHandler _parent;
            public CustomResourceRequestHandler(CustomRequestHandler parent)
            {
                _parent = parent;
            }

            protected override IResourceHandler GetResourceHandler(IWebBrowser chromiumWebBrowser, IBrowser browser, IFrame frame, IRequest request)
            {
                var uri = new Uri(request.Url);
                var fileName = uri.AbsolutePath;
                if (fileName == "/")
                    fileName = "/index.html";
                var fullFileName = Path.Combine(_parent._distFolder, fileName.Substring(1));
                var mimeType = Cef.GetMimeType(Path.GetExtension(fullFileName));

                if (File.Exists(fullFileName))
                    return ResourceHandler.FromString(File.ReadAllText(fullFileName), mimeType: mimeType);
                return null;

            }
        }
    }

    class Test
    {

        public void test()
        {
            MessageBox.Show("Test");
        }
    }
}
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

        public MainWindowView()
        {
            InitializeComponent();
            FitToMDI = true;

            var browser = new ChromiumWebBrowser(@"http://localhost:5173/");
            //   browser.RequestHandler = new CustomRequestHandler(@"http://127.0.0.1:5173/", @"C:\try\t61\vite-project\dist");
            var loaded = false;
            browser.LoadingStateChanged += delegate
            {
                if (!loaded)
                {
                    browser.ShowDevTools();
                }
                loaded = true;
            };
            this.Controls.Add(browser);
            //  browser.JavascriptObjectRepository.NameConverter = new CefSharp.JavascriptBinding.CamelCaseJavascriptNameConverter();
            browser.JavascriptObjectRepository.Register("dotnet", new Test(), isAsync: true, options: BindingOptions.DefaultBinder);
        }



    }
    public class MainWindow
    {
        public static void RunMenu()
        {
            new myUIC().Run();
            Common.RunOnNewThread(() =>
            {
            });
        }
        class myUIC : UIControllerBase
        {
            MainWindowView _view;
            public myUIC()
            {
                Handlers.Add(Command.Exit).Invokes += e =>
                {

                };
                Handlers.Add(Command.CloseForm).Invokes += e =>
                {

                };
                Handlers.Add(Command.CloseForm).Invokes += e =>
                {

                };
            }

            protected override void OnLoad()
            {
                View = () => _view = new MainWindowView();
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
using ENV.Printing;
#if NET6_0_OR_GREATER
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
#else
using System.Web.Mvc;
#endif
namespace ENV.Web
{
    public class PrintToPDFAttribute : ActionFilterAttribute
    {
        PrinterWriter.CapturePDFPrinting _printCapture;

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            _printCapture = new PrinterWriter.CapturePDFPrinting();

            base.OnActionExecuting(filterContext);
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {

            filterContext.Result = new FileStreamResult(_printCapture.GetResult(),
                System.Net.Mime.MediaTypeNames.Application.Pdf);
            base.OnActionExecuted(filterContext);
        }
    }
#if NET6_0_OR_GREATER
#else
    public class DataCollectorAttribute : ActionFilterAttribute
    {
        

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            DataCollector.Enabled = true;

            base.OnActionExecuting(filterContext);
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            filterContext.Result = DataResult.ToJsonResult(DataCollector.GetResult());



            base.OnActionExecuted(filterContext);
        }
    }
#endif
}
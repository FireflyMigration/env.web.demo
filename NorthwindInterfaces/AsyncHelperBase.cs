namespace Northwind
{
    /// <summary>AsyncHelperBase</summary>
    public abstract class AsyncHelperBase : ENV.AsyncHelperBase 
    {
        public AsyncHelperBase() : base(ApplicationClassType)
        {
        }
        public static System.Type ApplicationClassType;
    }
}

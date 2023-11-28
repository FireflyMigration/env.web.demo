using Firefly.Box;
using ENV.Data;
using ENV;
namespace Northwind
{
    /// <summary>Main Program(P#1)</summary>
    public abstract class Application : ApplicationControllerBase 
    {
        public readonly TextColumn SomeTextColumnThatIsUpdatedOnStartOfApplication = new TextColumn();
        #region Init Programs and Entities Collection
        static Application()
        {
            AsyncHelperBase.ApplicationClassType = typeof(Application);
        }
        #endregion
        #region Instance Management
        public static Application Instance 
        {
            get
            {
                var result = Context.Current[typeof(Application)] as Application;
                if (result == null)
                {
                    result = AbstractFactory.CreateInstance<Application>();
                    Context.Current[typeof(Application)] = result;
                }
                return result;
            }
        }
        #endregion
    }
}

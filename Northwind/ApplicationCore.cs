using Firefly.Box;
using ENV.Data;
using ENV;
namespace Northwind
{
    /// <summary>Main Program(P#1)</summary>
    /// <remark>Last change before Migration: 11/04/2007 20:07:17</remark>
    public class ApplicationCore : Application 
    {
        Views.ApplicationMdi _mdi;
        public ApplicationCore()
        {
            SetDefaultContextMenu(typeof(Views.DefaultContextMenu));
            Title = "Main Program";
            _applicationPrograms = _staticPrograms;
            _applicationEntities = _staticEntities;
            Columns.Add(SomeTextColumnThatIsUpdatedOnStartOfApplication);
        }
        protected override void OnLoad()
        {
            OnDatabaseErrorRetry = true;
        }
        protected override void OnStart()
        {
            SomeTextColumnThatIsUpdatedOnStartOfApplication.Value = "I was in on start";
        }
        #region Run Methods
        public static void Run()
        {
            Instance._mdi = new Views.ApplicationMdi();
            Instance.Run(Instance._mdi, () => Instance);
            Context.Current[typeof(Application)] = null;
        }
        protected override void Execute()
        {
            #if DEBUG
            Common.EnableDeveloperTools = true;
            #endif
            ;
            Common.BindStatusBar(_mdi.mainStatusLabel, _mdi.userStatusLabel, _mdi.activityStatusLabel, _mdi.expandStatusLabel, _mdi.expandTextBoxStatusLabel, _mdi.insertOverrideStatusLabel, _mdi.versionStatusLabel);
            _mdi.InitUserBasedMenus();
            base.Execute();
        }
        #endregion
        #region Init Programs and Entities Collection
        protected override string[] GetMenueNames()
        {
            return new []{"Default Pulldown menu", "Default Context menu"};
        }
        protected override ProgramCollection LoadAllProgramsCollection()
        {
            if (_staticPrograms==null)
                _staticPrograms = new ApplicationPrograms();
            return _staticPrograms;
        }
        protected override ApplicationEntityCollection LoadAllEntitiesCollection()
        {
            if (_staticEntities==null)
                _staticEntities = new ApplicationEntities();
            return _staticEntities;
        }
        #endregion
        #region Instance Management
        public static ApplicationCore Instance 
        {
            get
            {
                var result = Context.Current[typeof(Application)] as ApplicationCore;
                if (result == null)
                {
                    result = new ApplicationCore();
                    Context.Current[typeof(Application)] = result;
                }
                return result;
            }
        }
        static ApplicationPrograms _staticPrograms;
        static ApplicationEntities _staticEntities;
        #endregion
    }
}

namespace CinameManageMent.Helper
{
    public class FileHelper
    {
        public static string GenerateFileName(string path)
        {
            var name=Guid.NewGuid().ToString().Replace("-","");
            var lastIndex=path.LastIndexOf('.');
            var ext=path.Substring(lastIndex);
            return name + ext;
        }
    }
}

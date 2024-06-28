using game_api.DataAccess;
using Microsoft.AspNetCore.Mvc;


namespace game_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserInfoController : Controller
    {
        public UserInfoController() { }

        [HttpPost("[action]")]

        public string AddUser(User user)
        {
            UserInfo.UserSignUp(user.Name,user.Password,user.Email);
            return "sucess";
        }

        [HttpGet("[action]")]

        public List<User> GetUsers() 
        {
            return UserInfo.GetUserInfo();
        }

        [HttpGet("[action]/{email}")]

        public User LoginCheck(string email)
        {
            return UserInfo.LoginCheck(email);
        }

        [HttpGet("[action]/{name}")]

        public User GetUserByName(string name)
        {
            return UserInfo.GetUserByName(name);
        }

        [HttpPost("[action]")]

        public string UpdateScore(User user)
        {
            UserInfo.UpdateScore(user.Name, user.rpsPoint, user.memPoint);
            return "Updated";
        }

        [HttpPost("[action]")]

        public async Task<string> UpdateUser([FromForm]User user)
        {

            string relativePath = string.Empty;
            if (user.picuture != null && user.picuture.Length > 0 && user.picuture.Length < 2097152)
            {
                //Create a new Name for the file due to security reasons.
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(user.picuture.FileName);
                relativePath = Path.Combine(@"\Upload\Profile\", fileName);
                string fileDir = Directory.GetCurrentDirectory();
                string saveFilePath = fileDir + relativePath;

                string DirectoryPath = Path.GetDirectoryName(saveFilePath);
                if (!Directory.Exists(DirectoryPath)){
                    Directory.CreateDirectory(DirectoryPath);
                }

                using (var stream = System.IO.File.Create(saveFilePath))
                {
                    await user.picuture.CopyToAsync(stream);
                }
            }

            if (string.IsNullOrEmpty(relativePath))
            {
                User existingBook = UserInfo.GetUserByName(user.Name);
                relativePath = existingBook.coverPic;
            }

            UserInfo.UpdateUser(user.Name, user.Email, user.rowKey, relativePath);
            return "updated";
        }

        [HttpGet("[action]/{name}")]

        public IActionResult GetProfilePic(string name)
        {
            User user = UserInfo.GetUserByName(name);
            string filePath = Directory.GetCurrentDirectory() + user.coverPic;
            var image = System.IO.File.OpenRead(filePath);

            return File(image, "image/jpeg");
        }

        [HttpPost("[action]")]

        public string RateSubmit(Game game)
        {
            GameAccess.AddRating(game.totalrate, game.GameId);
            return "Success";
        }

        [HttpGet("[action]")]

        public List<Game> GetGames()
        {
            return GameAccess.GetGamesRate();
        }

        [HttpGet("[action]/{Id}")]

        public User CheckPassword(int Id)
        {
            return UserInfo.GetUserById(Id);
        }

        [HttpPost("[action]")]

        public string UpdatePassword(User user)
        {
            UserInfo.UpdatePassword(user.rowKey, user.Password);
            return "success";
        }

    }
}

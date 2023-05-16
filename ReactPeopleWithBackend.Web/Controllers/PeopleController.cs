using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactPeopleWithBackend.Data;
using ReactPeopleWithBackend.Web.Models;

namespace ReactPeopleWithBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [Route("GetPeople")]
        public List<Person> GetPeople()
        {
            var repo = new Repository(_connectionString);
            return repo.GetPeople();
        }
        [HttpPost]
        [Route("AddPerson")]
        public void AddPerson(Person person)
        {
            var repo = new Repository(_connectionString);
            repo.Add(person);
        }
        [HttpPost]
        [Route("UpdatePerson")]
        public void UpdatePerson(Person person)
        {
            var repo = new Repository(_connectionString);
            repo.Update(person);
        }
        [HttpPost]
        [Route("DeletePerson")]
        public void DeletePerson(Person person)
        {
            var repo = new Repository(_connectionString);
            repo.Delete(person);
        }
        [HttpPost]
        [Route("DeleteAll")]
        public void DeleteAll(Model model)
        {
            var repo = new Repository(_connectionString);
            repo.DeleteAll(model.Ids);
        }
    }
}

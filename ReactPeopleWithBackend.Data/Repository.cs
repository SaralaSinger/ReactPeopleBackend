using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;

namespace ReactPeopleWithBackend.Data
{
    public class Repository
    {
        private string _connectionString;
        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetPeople()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }
        public void Add(Person p)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(p);
            context.SaveChanges();
        }
        public void Update(Person p)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Update(p);
            context.SaveChanges();
        }
        public void Delete(Person p)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Remove(p);
            context.SaveChanges();
        }
        public void DeleteAll(List<int> ids)
        {
            using var context = new PeopleDbContext(_connectionString);
            foreach (int i in ids)
            {
                var person = context.People.FirstOrDefault(p => p.Id == i);
                Delete(person);
            }
        }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    public partial class DetailCategoryMovie
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Category))]
        public int IdCategory { get; set; }
        public virtual Category Category { get; set; }  // Change from IdCategoryNavigation to Category

        [ForeignKey(nameof(Movie))]
        public int IdMovie { get; set; }
        public virtual Movie Movie { get; set; }  // Change from IdMovieNavigation to Movie
    }
}

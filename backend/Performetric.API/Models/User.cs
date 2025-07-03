using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Performetric.API.Models
{
    [Table("user_credentials")]
    public class User : BaseModel
    {
        [PrimaryKey("id", false)]
        public int UserId { get; set; }


        [Column("mail_id")]
        public string MailId { get; set; }

        [Column("password_id")]
        public string PasswordId { get; set; }
        
        [Column("is_staff")]
        public bool IsStaff { get; set; }
    }
}

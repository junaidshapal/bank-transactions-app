using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankTransations.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }
        [Column(TypeName = "nvarchar(12)")]
        [DisplayName("Account Number")]
        [Required(ErrorMessage ="This Feild is required")]
        [MaxLength(12, ErrorMessage ="Maximum 12 characters only.")]
        public string AccountNumber { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        [DisplayName("Bank Name")]
        [Required(ErrorMessage = "This Feild is required")]
        public string BankName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        [DisplayName("Beneficiary Name")]
        [Required(ErrorMessage = "This Feild is required")]
        public string BeneficiaryName { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        [DisplayName("SWIFT Code")]
        [Required(ErrorMessage = "This Feild is required")]
        [MaxLength(11, ErrorMessage = "Maximum 11 characters only.")]
        public string SWIFTCode { get; set; }
        [DisplayName("Amount")]
        [Required(ErrorMessage = "This Feild is required")]
        public int Amount { get; set; }
        [DisplayFormat(DataFormatString ="{0:MMM-dd-yyyy}")]
        public DateTime Date { get; set; }
        
    }

    public class Withdraw
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Transaction")] //It is a foreign key of this table and primary key of Transaction Table
        public int TransactionId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public virtual Transaction Transaction { get; set; }
       
    }
}

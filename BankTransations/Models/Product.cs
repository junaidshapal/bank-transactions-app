using System.ComponentModel.DataAnnotations.Schema;

namespace BankTransations.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public string Name { get; set; }
    }

    public class Order
    {
        public int OrderId { get; set; }
        public DateTime Date { get; set; }
    }

    public class OrderDetail
    {
        public int OrderDetailId { get; set;}
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public string Items { get; set; }
        public decimal TotalPrice { get; set; }
    }
}

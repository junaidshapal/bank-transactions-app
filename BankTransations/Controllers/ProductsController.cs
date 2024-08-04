using BankTransations.DbContextClass;
using BankTransations.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankTransations.Controllers
{
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext _context;
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            //return _context.Products != null ?
            //   View(await _context.Products.ToListAsync()) :
            // Problem("Entity set 'ApplicationDbContext.Transactions'  is null.");

            return View(await _context.Products.ToListAsync());
        }

        [HttpGet]
        public async Task<IActionResult> AddOrEditProduct(int id = 0)
        {
            if (id == 0)
            {
                return View(new Product());
            }
            else
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    return NotFound("Not Found");
                }
                return View(product);
            }
        }

        //[HttpPost("Product")]
        //public async Task<IActionResult> AddOrEditProduct([Bind("ProductId", "Price", "Name")]Product product)
        //{ 
        //    if(ModelState.IsValid)
        //    {
        //       if(product.ProductId == 0)
        //        {
        //            _context.Add(product);
        //        }
        //        else
        //        {
        //            _context.Update(product);
        //        }
        //        await _context.SaveChangesAsync();

        //        var data = await _context.Products.ToListAsync();
        //        return View("_ViewAllProducts", data);
        //    }
        //    return View(product);
        //}

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddOrEditProduct(int id, [Bind("ProductId, Name, Price")] Product product)
        {
            if (ModelState.IsValid)
            {
                if (id == 0)
                {
                    _context.Add(product);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    try
                    {
                        _context.Update(product);
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!ProductExists(product.ProductId))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }

                return Json(new { isValid = true, html = Helper.RenderRazorViewToString(this, "_ViewAllProducts", _context.Products.ToList()) });
            }
            return Json(new { isValid = false, html = Helper.RenderRazorViewToString(this, "_ViewAllProducts", product) });
        }

        private bool ProductExists(int productId)
        {
            throw new NotImplementedException();
        }




        // POST: Transactions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Products == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Products'  is null.");
            }
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
            }

            await _context.SaveChangesAsync();
            return Json(new { html = Helper.RenderRazorViewToString(this, "_ViewAllProducts", _context.Products.ToList()) });
        }

    }
}

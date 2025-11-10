# 🔧 Promotion Not Showing - Debug Guide

## ✅ Quick Fix Steps:

### Step 1: Update a Product with Promotion
1. Go to `/admin/products`
2. Click "..." → "Edit" on any product
3. Scroll to **"Promotion Settings"** card (right sidebar)
4. ✅ **Check "Enable Promotion"**
5. Enter **Discount %**: `85`
6. Enter **Timer Duration**: `24`
7. Click **"Update Product"**
8. Wait for success message

### Step 2: Check Server Console
After saving, check your terminal/console for these logs:
```
Product promotion data: { enabled: true, discountPercentage: 85, timerDuration: 24, ... }
Promotion enabled: true
Discount percentage: 85
```

### Step 3: View Product Page
1. Go to `/shop/[product-slug]`
2. You should see:
   - **Top badge**: "MEGA SALE IS ON! 85% OFF"
   - **Countdown timer**: Hours, Minutes, Seconds
   - **Discount badge**: "85% OFF - Limited Time!"

---

## 🐛 If Still Not Showing:

### Check 1: Is Promotion Enabled?
The checkbox must be **checked** (✅)
- If unchecked, nothing will show
- Re-edit product and check the box

### Check 2: Did Product Save Successfully?
- Look for green success toast
- If error, check console for details
- Try saving again

### Check 3: Are You Viewing the Right Product?
- Make sure you're viewing the product you just edited
- Check the product slug in URL matches

### Check 4: Clear Cache & Refresh
```bash
# Stop the dev server (Ctrl+C)
# Delete .next folder
rm -rf .next

# Restart
npm run dev
```

---

## 🔍 Manual Database Check:

### Option 1: Add Debug to Product Page
The product detail page now has console.log statements.

Check your browser console (F12) or server terminal for:
```
Product promotion data: ...
Promotion enabled: ...
Discount percentage: ...
```

### Option 2: Check Database Directly
If you have MongoDB access:
```javascript
// In MongoDB Compass or Shell
db.products.findOne({ slug: "your-product-slug" })

// Look for promotion field:
{
  promotion: {
    enabled: true,
    discountPercentage: 85,
    timerDuration: 24,
    timerEndDate: ISODate("...")
  }
}
```

---

## ✅ Expected Behavior:

### When Promotion Enabled:
```
Product Detail Page:
┌─────────────────────────────────┐
│ 🔥 MEGA SALE IS ON! 85% OFF    │  ← Header badge
└─────────────────────────────────┘

Product Name
Description...

┌─────────────────────────────────┐
│     85% OFF - Limited Time!     │  ← Countdown badge
└─────────────────────────────────┘

┌────┐  ┌────┐  ┌────┐
│ 23 │  │ 45 │  │ 12 │  ← Timer
│hrs │  │min │  │sec │
└────┘  └────┘  └────┘
```

### When Promotion Disabled:
- No badges
- No timer
- Clean product page

---

## 🎯 Common Issues:

### Issue 1: Checkbox Not Checked
**Solution**: Edit product, check "Enable Promotion", save

### Issue 2: Discount is 0
**Solution**: Enter a number (e.g., 85) in "Discount % Off" field

### Issue 3: Old Data Cached
**Solution**: 
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Or restart dev server

### Issue 4: Product Not Saved
**Solution**: 
1. Check for error messages
2. Ensure all required fields filled
3. Try saving again

---

## 📝 Test Checklist:

- [ ] Promotion checkbox is ✅ checked
- [ ] Discount % is entered (e.g., 85)
- [ ] Timer duration is entered (e.g., 24)
- [ ] Product saved successfully (green toast)
- [ ] Page refreshed after save
- [ ] Viewing correct product page
- [ ] Console shows promotion data

---

## 🚀 Quick Test:

### Create New Test Product:
1. Go to `/admin/products/new`
2. Fill in:
   - Name: "Test Promotion Product"
   - Description: "Testing promotion feature"
   - Price: 99
   - Category: "Courses & E-books"
   - Add at least 1 media URL
3. Scroll to **Promotion Settings**
4. ✅ Enable Promotion
5. Discount: 85
6. Timer: 2 (hours)
7. Save
8. View product page
9. Should see timer & discount!

---

## 💡 Debug Output:

The product page now logs to console:
- `Product promotion data:` - Full promotion object
- `Promotion enabled:` - true/false
- `Discount percentage:` - The % value

**Check your browser console (F12) or server terminal!**

---

## ✅ If Everything Correct But Still Not Showing:

1. **Restart dev server**:
   ```bash
   # Stop: Ctrl+C
   npm run dev
   ```

2. **Clear browser cache**:
   - Chrome: Ctrl+Shift+Delete
   - Or use Incognito mode

3. **Check promotion field structure**:
   ```typescript
   promotion: {
     enabled: true,        // Must be true
     discountPercentage: 85, // Must be > 0
     timerDuration: 24,    // Hours
     timerEndDate: Date    // Auto-calculated
   }
   ```

---

## 📞 Still Having Issues?

Check the console logs and share:
1. What you see in browser console (F12)
2. What you see in server terminal
3. Screenshot of Promotion Settings form
4. Screenshot of product page

The debug logs will show exactly what data is being loaded!

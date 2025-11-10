# ✅ Auto Price Calculation Based on Promotion

## 🎯 Feature Added: Dynamic Pricing

The product detail page now **automatically calculates** the special offer price based on the promotion discount!

---

## 💰 How It Works:

### When Promotion is ENABLED:
```
Original Price: Rs 1900
Promotion Discount: 85%
Calculated Price: Rs 1900 × (1 - 0.85) = Rs 285
```

**Display:**
```
Special Offer Rs 1900 Rs 285 [Save 85%]
                 ↑         ↑        ↑
            (crossed)  (green)  (red badge)
```

### When Promotion is DISABLED:
```
Original Price: Rs 1900
Regular Price: Rs 200 (from database)
```

**Display:**
```
Special Offer Rs 1900 Rs 200
                 ↑         ↑
            (crossed)  (orange)
```

---

## 🎨 Visual Examples:

### With 85% Promotion:
```
┌─────────────────────────────────────────────┐
│ Special Offer Rs 1900 Rs 285 [Save 85%]    │
│                  ↑         ↑         ↑      │
│              crossed   green    red badge   │
└─────────────────────────────────────────────┘

Button: "YES, I WANT THIS PACK FOR Rs 285"
```

### With 50% Promotion:
```
┌─────────────────────────────────────────────┐
│ Special Offer Rs 1900 Rs 950 [Save 50%]    │
└─────────────────────────────────────────────┘

Button: "YES, I WANT THIS PACK FOR Rs 950"
```

### Without Promotion:
```
┌─────────────────────────────────────────────┐
│ Special Offer Rs 1900 Rs 200                │
└─────────────────────────────────────────────┘

Button: "YES, I WANT THIS PACK FOR Rs 200"
```

---

## 🔧 Calculation Logic:

```typescript
const calculatePrice = () => {
  if (product.promotion?.enabled && product.promotion.discountPercentage > 0) {
    // Calculate discounted price
    const discount = product.promotion.discountPercentage / 100;
    const discountedPrice = product.originalPrice * (1 - discount);
    return discountedPrice;
  }
  // Use regular price if no promotion
  return product.price;
};
```

---

## 📊 Examples:

### Example 1: 85% Discount
```
Original Price: Rs 1900
Discount: 85%
Final Price: Rs 1900 × 0.15 = Rs 285
Savings: Rs 1615
```

### Example 2: 70% Discount
```
Original Price: Rs 1900
Discount: 70%
Final Price: Rs 1900 × 0.30 = Rs 570
Savings: Rs 1330
```

### Example 3: 50% Discount
```
Original Price: Rs 1900
Discount: 50%
Final Price: Rs 1900 × 0.50 = Rs 950
Savings: Rs 950
```

### Example 4: No Promotion
```
Original Price: Rs 1900
Regular Price: Rs 200 (from database)
Final Price: Rs 200
```

---

## 🎯 Admin Control:

### Set Promotion in Admin:
1. Edit product
2. Enable Promotion ✅
3. Set Discount: `85` (%)
4. Save

### Result on Product Page:
- Original Price: Rs 1900 (crossed out)
- Final Price: Rs 285 (green, calculated)
- Badge: "Save 85%" (red)
- Button: "Rs 285"

---

## ✅ Features:

### Dynamic Calculation:
- ✅ Auto-calculates based on discount %
- ✅ Uses originalPrice as base
- ✅ Falls back to regular price if no promotion
- ✅ Updates in real-time

### Visual Indicators:
- ✅ Green price when promotion active
- ✅ Orange price when no promotion
- ✅ Red "Save X%" badge
- ✅ Crossed-out original price

### Button Updates:
- ✅ Shows calculated price in button text
- ✅ "YES, I WANT THIS PACK FOR Rs [calculated]"
- ✅ Updates automatically

---

## 📱 User Experience:

### Customer Sees:
1. **Timer** (if promotion enabled)
2. **Discount badge** at top
3. **Calculated price** in green
4. **Savings badge** showing %
5. **Updated button** with final price

### Example Flow:
```
1. Admin sets 85% discount
2. Customer visits product page
3. Sees: "MEGA SALE IS ON! 85% OFF"
4. Sees countdown timer
5. Sees: "Rs 1900 Rs 285 [Save 85%]"
6. Clicks: "YES, I WANT THIS PACK FOR Rs 285"
7. Gets product at calculated price!
```

---

## 🔍 Price Priority:

### Priority Order:
1. **If promotion enabled**: Calculate from originalPrice
   ```
   finalPrice = originalPrice × (1 - discount/100)
   ```

2. **If no promotion**: Use regular price
   ```
   finalPrice = product.price
   ```

---

## 💡 Benefits:

### For Admin:
- ✅ Just set discount %
- ✅ Price auto-calculates
- ✅ No manual price updates needed
- ✅ Consistent pricing

### For Customers:
- ✅ See exact savings
- ✅ Clear discount %
- ✅ Transparent pricing
- ✅ Trust in calculations

---

## 🎯 Testing:

### Test Different Discounts:
1. **85% Discount**:
   - Original: Rs 1900
   - Final: Rs 285
   - Savings: Rs 1615

2. **50% Discount**:
   - Original: Rs 1900
   - Final: Rs 950
   - Savings: Rs 950

3. **25% Discount**:
   - Original: Rs 1900
   - Final: Rs 1425
   - Savings: Rs 475

4. **No Discount**:
   - Original: Rs 1900
   - Final: Rs 200 (regular)
   - No savings badge

---

## ✅ Summary:

### What's Automatic:
- ✅ Price calculation based on discount %
- ✅ Savings badge display
- ✅ Button text update
- ✅ Color changes (green/orange)

### What Admin Controls:
- ✅ Enable/disable promotion
- ✅ Set discount percentage
- ✅ Set timer duration

### Result:
**Professional, dynamic pricing that updates automatically based on promotions!** 🎉

---

## 🚀 How to Use:

1. **Edit product** in admin
2. **Enable promotion**
3. **Set discount**: e.g., 85%
4. **Save**
5. **View product page**
6. **See calculated price**: Rs 1900 → Rs 285
7. **Customer gets discount automatically!**

The price calculation happens in real-time on the product page! 💰✨

# Light Mode Update Guide

This guide shows the CSS class replacements needed for light mode support across all admin pages.

## Pattern Replacements

Apply these replacements across ALL admin pages (Offers, Dashboard, Submission, etc.):

### 1. Labels
- `text-gray-300` → `text-gray-700 dark:text-gray-300`
- `text-gray-400` → `text-gray-600 dark:text-gray-400`

### 2. Inputs & Textareas
- `bg-gray-700 border-gray-600 text-white` → `bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white`

### 3. Dialogs & Modals
- `bg-gray-800 border-gray-600 text-white` → `bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white`

### 4. Cards
- `bg-gray-800` → `bg-white dark:bg-gray-800`
- `bg-gray-700` → `bg-gray-100 dark:bg-gray-700`

### 5. Table Headers
- `border-gray-600` → `border-gray-300 dark:border-gray-600`

### 6. Table Rows
- `hover:bg-gray-700/50` → `hover:bg-gray-100 dark:hover:bg-gray-700/50`

### 7. Selects
- `bg-gray-700 border-gray-600 text-white` → `bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white`

### 8. SelectContent
- `bg-gray-700 border-gray-600` → `bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600`

### 9. SelectItem
- `text-white focus:bg-gray-600` → `text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-600`

### 10. Alert Dialogs
- `bg-gray-800 border-gray-600` → `bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`
- `text-white` → `text-gray-900 dark:text-white`

### 11. Table Cells
- `text-gray-400` → `text-gray-600 dark:text-gray-400`
- `text-gray-300` → `text-gray-700 dark:text-gray-300`

### 12. Buttons (Cancel/Secondary)
- `border-gray-600 text-gray-300 hover:bg-gray-700` → `border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`

## Quick Search & Replace Commands

You can use VS Code's Search & Replace (Ctrl+Shift+H) with these patterns:

1. Search: `className="text-gray-300"`  
   Replace: `className="text-gray-700 dark:text-gray-300"`

2. Search: `className="text-gray-400"`  
   Replace: `className="text-gray-600 dark:text-gray-400"`

3. Search: `className="bg-gray-700 border-gray-600 text-white"`  
   Replace: `className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"`

4. Search: `className="bg-gray-800`  
   Replace: `className="bg-white dark:bg-gray-800`

5. Search: `border-gray-600`  
   Replace: `border-gray-300 dark:border-gray-600`

## Files to Update

1. `/src/pages/admin/Offers.jsx` ✅ (Partially done)
2. `/src/pages/admin/Dashboard.jsx`
3. `/src/pages/admin/Submission.jsx`
4. `/src/pages/admin/SubmissionExport.jsx`
5. `/src/pages/admin/Conversion.jsx`
6. `/src/pages/admin/Payments.jsx`
7. `/src/pages/admin/Profile.jsx`
8. `/src/pages/admin/Support.jsx`

## Testing Checklist

After updates, test:
- [ ] Forms are readable in light mode (black text on white background)
- [ ] Dialogs/Modals have white background in light mode
- [ ] Tables are readable
- [ ] Buttons have proper contrast
- [ ] Input fields are white with black text in light mode
- [ ] Dark mode still works as before

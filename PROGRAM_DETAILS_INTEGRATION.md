# Program Details Page - Integration Guide

## Dynamic Elements for Backend Integration

The program details page has been designed to easily support dynamic content for different programs. Here are the key elements that need to be updated:

### 1. Program Banner Image (Hero Background)

**Location**: `program-details.html` - Line ~157
```html
<div class="program-banner-image" style="background-image: url('DYNAMIC_BANNER_URL');"></div>
```

**Integration**: Update the `background-image` URL for each program
- **Python**: `assets/images/product/Image.png`
- **Vue.js**: `assets/images/product/Image-1.png`
- **Docker**: `assets/images/product/Image-2.png`
- etc.

### 2. Program Logo

**Location**: `program-details.html` - Line ~190
```html
<img
  src="DYNAMIC_LOGO_URL"
  alt="DYNAMIC_PROGRAM_NAME"
  class="program-logo__img"
  data-program-logo
/>
```

**Integration**: Update `src` and `alt` attributes for each program

### 3. JavaScript Helper Function

Use the provided function in `assets/js/program-details.js`:

```javascript
// Example for Vue.js program
const programData = {
  bannerImage: 'assets/images/product/Image-1.png',
  logoImage: 'assets/images/product/Image-1.png',
  programName: 'Vue.js Complete Guide'
};

updateProgramImages(programData);
```

### 4. Backend Integration Examples

#### PHP Example:
```php
<div class="program-banner-image" style="background-image: url('<?= $program['banner_image'] ?>');"></div>

<img
  src="<?= $program['logo_image'] ?>"
  alt="<?= $program['name'] ?>"
  class="program-logo__img"
  data-program-logo
/>
```

#### React/Next.js Example:
```jsx
<div 
  className="program-banner-image" 
  style={{backgroundImage: `url('${program.bannerImage}')`}}
></div>

<img
  src={program.logoImage}
  alt={program.name}
  className="program-logo__img"
  data-program-logo
/>
```

### 5. Image Naming Convention

Suggested naming pattern:
- Banner: `assets/images/product/{program-slug}-banner.png`
- Logo: `assets/images/product/{program-slug}-logo.png`

### 6. Other Dynamic Content

Don't forget to also make these elements dynamic:
- Program title
- Program description
- Duration, language, mode, location
- Registration dates
- All section content

This structure ensures easy integration with any backend system while maintaining the visual design. 
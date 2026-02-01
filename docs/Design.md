# UI Redesign Prompt: Modern Minimal Landing Page Aesthetic

## 🎯 Objective
Transform the existing LlamaCloud Query application to match the modern, minimal landing page design aesthetic from the Pinterest inspiration, while preserving all current functionality (query interface, results display, source citations, loading states, error handling).

---

## 📐 Design Inspiration Analysis

Based on the Pinterest pin (landing page marketing design), the design features:

### Visual Characteristics:
- **Ultra-minimal, clean aesthetic**
- **Large whitespace and breathing room**
- **Soft, muted color palette** (likely pastels or very light tones)
- **Modern sans-serif typography** with clear hierarchy
- **Subtle gradients or glass-morphism effects**
- **Rounded, soft corners** on all elements
- **Floating card designs** with subtle shadows
- **Professional, conversion-focused layout**

---

## 🎨 Complete UI Redesign Specification

### **Color Palette**
Replace the current blue-focused palette with a modern minimal scheme:

```css
/* Primary Colors */
--primary-50: #faf5ff;     /* Lightest purple/lavender */
--primary-100: #f3e8ff;    
--primary-200: #e9d5ff;    
--primary-300: #d8b4fe;    
--primary-400: #c084fc;    
--primary-500: #a855f7;    /* Main brand purple */
--primary-600: #9333ea;    
--primary-700: #7e22ce;    

/* Neutral Grays */
--gray-50: #fafafa;        /* Background */
--gray-100: #f5f5f5;       
--gray-200: #e5e5e5;       
--gray-300: #d4d4d4;       
--gray-400: #a3a3a3;       
--gray-500: #737373;       
--gray-600: #525252;       
--gray-900: #171717;       /* Text */

/* Accent Colors */
--accent-success: #22c55e;  /* For positive states */
--accent-warning: #f59e0b;  /* For loading */
--accent-error: #ef4444;    /* For errors */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
--gradient-subtle: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
```

### **Typography System**
```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Type Scale */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px - Hero titles */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### **Spacing System**
```css
/* Consistent spacing scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

### **Border Radius System**
```css
--radius-sm: 0.5rem;   /* 8px - Small elements */
--radius-md: 0.75rem;  /* 12px - Buttons, inputs */
--radius-lg: 1rem;     /* 16px - Cards */
--radius-xl: 1.5rem;   /* 24px - Large cards */
--radius-2xl: 2rem;    /* 32px - Hero sections */
--radius-full: 9999px; /* Fully rounded */
```

### **Shadow System**
```css
/* Soft, elevated shadows */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
--shadow-glow: 0 0 40px rgba(168, 85, 247, 0.15); /* Purple glow */
```

---

## 🖼️ Layout Redesign (app/page.tsx)

### **Overall Page Structure**
```
┌─────────────────────────────────────────────────────────────┐
│                   [Subtle gradient background]               │
│                                                              │
│    ┌───────────────────────────────────────────────┐       │
│    │         Hero Section (Center-aligned)         │       │
│    │   • Large heading with gradient text          │       │
│    │   • Subheading with description               │       │
│    │   • Decorative icon/illustration              │       │
│    └───────────────────────────────────────────────┘       │
│                                                              │
│    ┌───────────────────────────────────────────────┐       │
│    │     Floating Query Card (Glass effect)        │       │
│    │   • Soft shadow & blur backdrop               │       │
│    │   • Large text area (minimal borders)         │       │
│    │   • Character counter (subtle)                │       │
│    │   • Gradient button (primary action)          │       │
│    │   • Example chips (pill-shaped)               │       │
│    └───────────────────────────────────────────────┘       │
│                                                              │
│    ┌───────────────────────────────────────────────┐       │
│    │     Results Card (Fade-in animation)          │       │
│    │   • Glassmorphic background                   │       │
│    │   • AI badge/tag                              │       │
│    │   • Answer text (generous line-height)        │       │
│    │   • Sources accordion (minimal)               │       │
│    └───────────────────────────────────────────────┘       │
│                                                              │
│    [Footer - Minimal, centered, light text]                 │
└─────────────────────────────────────────────────────────────┘
```

### **Background Treatment**
```css
body {
  background: linear-gradient(180deg, 
    #ffffff 0%, 
    #faf5ff 50%, 
    #f3e8ff 100%
  );
  /* OR use a radial gradient */
  background: radial-gradient(ellipse at top, 
    #faf5ff 0%, 
    #ffffff 100%
  );
  min-height: 100vh;
}
```

---

## 🎯 Component-Specific Redesigns

### **1. Hero Section**
```tsx
// New hero section at the top
<div className="text-center mb-16 pt-20">
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 
                  text-purple-700 rounded-full text-sm font-medium mb-6">
    <svg>✨</svg>
    <span>AI-Powered Document Search</span>
  </div>
  
  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 
                 tracking-tight">
    Ask Questions About
    <span className="bg-gradient-to-r from-purple-600 to-pink-500 
                     bg-clip-text text-transparent"> Your Documents</span>
  </h1>
  
  <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
    Get instant, accurate answers from your knowledge base with AI-powered 
    semantic search and source citations.
  </p>
</div>
```

**Design specs:**
- Hero heading: 48-60px, font-weight 700
- Gradient text using `bg-clip-text`
- Badge/pill above heading with icon
- Centered alignment
- Generous vertical spacing (80px top padding)

---

### **2. Query Input Card (Glassmorphism)**
```tsx
<div className="max-w-3xl mx-auto mb-12">
  <div className="relative backdrop-blur-xl bg-white/70 rounded-3xl 
                  shadow-xl border border-white/50 p-8 
                  hover:shadow-2xl transition-all duration-300">
    
    {/* Decorative gradient background blob */}
    <div className="absolute inset-0 bg-gradient-to-br 
                    from-purple-500/5 to-pink-500/5 rounded-3xl" />
    
    <div className="relative z-10">
      <textarea
        className="w-full px-6 py-4 text-lg bg-gray-50/80 border-0 
                   rounded-2xl focus:ring-2 focus:ring-purple-500 
                   focus:bg-white transition-all resize-none 
                   placeholder:text-gray-400"
        placeholder="What would you like to know?"
        rows={4}
      />
      
      {/* Character counter - minimal, faded */}
      <div className="absolute bottom-4 right-6 text-xs text-gray-400 
                      font-medium">
        {count}/500
      </div>
      
      {/* Action buttons row */}
      <div className="flex items-center justify-between mt-6">
        <button className="text-sm text-gray-500 hover:text-gray-700 
                           flex items-center gap-2">
          <X size={16} />
          Clear
        </button>
        
        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 
                           to-pink-600 text-white rounded-full font-semibold 
                           shadow-lg hover:shadow-xl hover:scale-105 
                           transition-all duration-200 flex items-center gap-2">
          <Sparkles size={18} />
          Ask Question
        </button>
      </div>
    </div>
  </div>
  
  {/* Example questions - Redesigned as pills */}
  <div className="mt-8 text-center">
    <p className="text-sm text-gray-500 mb-4 font-medium">Try asking:</p>
    <div className="flex flex-wrap justify-center gap-3">
      {examples.map(q => (
        <button className="px-4 py-2 bg-white/80 backdrop-blur-sm 
                           hover:bg-purple-50 text-gray-700 text-sm 
                           rounded-full border border-gray-200/50 
                           hover:border-purple-300 transition-all 
                           hover:shadow-md">
          {q}
        </button>
      ))}
    </div>
  </div>
</div>
```

**Key changes:**
- Glassmorphic card: `backdrop-blur-xl` + `bg-white/70`
- Rounded corners: `rounded-3xl` (48px)
- Gradient button instead of solid
- Pill-shaped example chips
- Floating/elevated appearance
- Smooth hover effects

---

### **3. Loading State**
```tsx
{loading && (
  <div className="max-w-3xl mx-auto animate-fade-in">
    <div className="backdrop-blur-xl bg-white/70 rounded-3xl 
                    shadow-lg border border-white/50 p-8">
      <div className="flex items-center justify-center gap-4">
        {/* Animated gradient spinner */}
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 
                        border-t-purple-600 animate-spin" />
        
        <div>
          <p className="text-lg font-semibold text-gray-900">
            Searching your knowledge base...
          </p>
          <p className="text-sm text-gray-500 mt-1">
            This may take a few seconds
          </p>
        </div>
      </div>
      
      {/* Optional: Progress steps */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100" />
        <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-200" />
      </div>
    </div>
  </div>
)}
```

---

### **4. Results Card (Answer Display)**
```tsx
{response && (
  <div className="max-w-3xl mx-auto animate-fade-in">
    <div className="backdrop-blur-xl bg-white/70 rounded-3xl 
                    shadow-xl border border-white/50 overflow-hidden">
      
      {/* Header with AI badge */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 
                      px-8 py-6 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 
                          to-pink-600 rounded-xl flex items-center 
                          justify-center shadow-lg">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Analysis</h3>
            <p className="text-sm text-gray-500">
              Generated from {response.sources.length} sources
            </p>
          </div>
        </div>
      </div>
      
      {/* Answer content */}
      <div className="px-8 py-8">
        <div className="prose prose-lg max-w-none text-gray-700 
                        leading-relaxed">
          {response.answer}
        </div>
      </div>
      
      {/* Sources section */}
      {response.sources.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setShowSources(!showSources)}
            className="w-full px-8 py-5 flex items-center justify-between 
                       hover:bg-gray-100/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg 
                              flex items-center justify-center 
                              group-hover:bg-purple-200 transition-colors">
                <FileText size={16} className="text-purple-600" />
              </div>
              <span className="font-semibold text-gray-900">
                View {response.sources.length} Sources
              </span>
            </div>
            <ChevronDown className={`text-gray-400 transition-transform 
                                     ${showSources ? 'rotate-180' : ''}`} 
                         size={20} />
          </button>
          
          {showSources && (
            <div className="px-8 py-6 space-y-4 animate-fade-in 
                            bg-white/50">
              {response.sources.map((source, idx) => (
                <div className="p-5 bg-white rounded-2xl border 
                                border-gray-200 hover:border-purple-300 
                                hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2 
                                     px-3 py-1 bg-purple-50 text-purple-700 
                                     rounded-full text-xs font-semibold">
                      <Hash size={12} />
                      Source {idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 bg-gray-200 rounded-full 
                                      overflow-hidden">
                        <div className="h-full bg-gradient-to-r 
                                        from-purple-600 to-pink-600 
                                        rounded-full"
                             style={{width: `${source.score * 100}%`}} />
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        {Math.round(source.score * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    "{source.text}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
)}
```

**Key changes:**
- Glassmorphic card with gradient header
- AI badge with icon
- Relevance shown as progress bar instead of percentage
- Smooth accordion animation
- Individual source cards with hover states
- Generous padding and spacing

---

### **5. Error State**
```tsx
{error && (
  <div className="max-w-3xl mx-auto animate-fade-in">
    <div className="backdrop-blur-xl bg-red-50/70 rounded-3xl 
                    shadow-lg border border-red-200/50 p-8">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-red-100 rounded-xl flex 
                        items-center justify-center shrink-0">
          <AlertCircle className="text-red-600" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 mb-1">
            Unable to process request
          </h3>
          <p className="text-sm text-red-700 leading-relaxed mb-4">
            {error}
          </p>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 
                             text-white text-sm rounded-full font-medium 
                             transition-colors">
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
)}
```

---

### **6. Footer Redesign**
```tsx
<footer className="mt-24 pb-12 text-center">
  <div className="max-w-4xl mx-auto">
    {/* Divider */}
    <div className="h-px bg-gradient-to-r from-transparent 
                    via-gray-300 to-transparent mb-8" />
    
    
    
    <p className="text-xs text-gray-400">
      © 2024 Document Query. All rights reserved.
    </p>
  </div>
</footer>
```

---

## 🎨 Additional Visual Effects

### **Micro-interactions**
```css
/* Button hover lift */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(168, 85, 247, 0.25);
}

/* Card hover glow */
.card-glass:hover {
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 60px rgba(168, 85, 247, 0.1);
}

/* Input focus glow */
textarea:focus {
  box-shadow: 
    0 0 0 3px rgba(168, 85, 247, 0.1),
    0 4px 12px rgba(168, 85, 247, 0.15);
}
```

### **Animations**
```css
/* Fade in from bottom */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse for loading */
@keyframes pulse-glow {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  }
  50% {
    opacity: 0.7;
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.5);
  }
}

/* Shimmer for loading state */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
```

---

## 📱 Responsive Considerations

### **Mobile Optimizations (< 640px)**
- Hero heading: reduce to 36px
- Reduce card padding: 24px → 16px
- Stack buttons vertically
- Reduce border radius: 24px → 16px
- Hide decorative blobs
- Simplify glassmorphism (reduce blur)

### **Tablet (640px - 1024px)**
- Hero heading: 42px
- Card padding: 32px
- Maintain glassmorphism effects

---

## ✅ Implementation Checklist

### Phase 1: Foundation
- [ ] Update color variables in `tailwind.config.ts`
- [ ] Add custom fonts (Inter weights 300-700)
- [ ] Create utility classes for glassmorphism
- [ ] Set up gradient utilities
- [ ] Add animation keyframes to `globals.css`

### Phase 2: Layout
- [ ] Redesign page background (gradient)
- [ ] Implement hero section with gradient text
- [ ] Add top badge/pill element
- [ ] Update max-width containers

### Phase 3: Query Card
- [ ] Convert to glassmorphic design
- [ ] Update textarea styling
- [ ] Redesign character counter
- [ ] Convert button to gradient
- [ ] Redesign example chips as pills
- [ ] Add clear button with icon

### Phase 4: Results
- [ ] Redesign answer card with gradient header
- [ ] Add AI badge with icon
- [ ] Update sources accordion
- [ ] Convert source items to cards
- [ ] Add relevance progress bars
- [ ] Implement smooth transitions

### Phase 5: States
- [ ] Redesign loading state with animations
- [ ] Update error state design
- [ ] Add empty state illustration
- [ ] Implement micro-interactions

### Phase 6: Footer
- [ ] Redesign footer with gradient divider
- [ ] Add "Powered by" pills
- [ ] Update link styles

### Phase 7: Polish
- [ ] Test all hover states
- [ ] Verify mobile responsiveness
- [ ] Add focus states for accessibility
- [ ] Test dark mode (optional)
- [ ] Performance optimization
- [ ] Cross-browser testing

---

## 🎯 Key Principles to Maintain

1. **Glassmorphism over flat design**
   - Use `backdrop-blur-xl` + semi-transparent backgrounds
   - Layer with subtle gradients

2. **Generous spacing**
   - Double the padding/margins from current design
   - Let content breathe

3. **Soft, rounded corners**
   - Minimum 16px border radius
   - Use 24-32px for hero elements

4. **Gradient accents**
   - Purple-to-pink gradients for primary actions
   - Subtle background gradients

5. **Smooth animations**
   - 200-300ms transition duration
   - Ease-out timing function
   - Transform + opacity for fade effects

6. **Elevated hierarchy**
   - Use shadows to create depth
   - Layer cards with z-index
   - Gradient overlays for emphasis

---

## 🚫 What NOT to Change

✅ **Keep these functional elements:**
- All state management logic
- API route implementation
- Error handling
- Input validation
- Character counting
- Keyboard shortcuts (Enter to submit)
- Cache implementation
- Environment variable checks
- Source relevance calculation
- All existing features and capabilities

❌ **Only change:**
- Visual design (colors, spacing, shadows)
- Component styling (CSS/Tailwind classes)
- Layout structure (positioning, containers)
- Typography (font sizes, weights)
- Animations and transitions
- Icons and decorative elements

---

## 📦 Additional Dependencies Needed

```json
{
  "dependencies": {
    "lucide-react": "^0.263.1"  // For modern icons (if not already installed)
  }
}
```

Icons to use from lucide-react:
- `Sparkles` - AI features
- `FileText` - Documents
- `Zap` - Speed/power
- `Cpu` - Processing
- `AlertCircle` - Errors
- `ChevronDown` - Accordions
- `X` - Close/clear
- `Hash` - Source numbering

---

## 🎨 Final Notes

This redesign transforms the application from a functional, corporate interface into a modern, marketing-focused landing page aesthetic while maintaining 100% of the original functionality. The glassmorphic design, generous spacing, and gradient accents create a premium feel that aligns with contemporary SaaS design trends.

**Expected outcome:**
- More visually appealing and modern
- Better conversion-focused design
- Improved user engagement through micro-interactions
- Professional, polished appearance
- Maintains all existing features and logic
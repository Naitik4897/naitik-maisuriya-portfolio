# 🚀 Naitik Maisuriya - Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean design with dark theme, animated components, and optimized SEO.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/naitikmaisuriya/portfolio)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/naitikmaisuriya/portfolio)

## ✨ Features

- **Modern Design**: Dark theme with cyan/purple gradient accents
- **Responsive**: Mobile-first design that works on all devices  
- **Performance**: Lazy-loaded components and optimized assets
- **SEO Optimized**: Meta tags, structured data, sitemap, robots.txt
- **Contact Integration**: EmailJS for form submissions + WhatsApp chat
- **Animations**: Smooth scroll animations and hover effects
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod validation
- **Email**: EmailJS (no backend needed)
- **Chat**: WhatsApp integration via wa.me
- **SEO**: React Helmet Async
- **Deployment**: Vercel/Netlify ready

## 📱 Contact Features

### Email Contact Form
- Professional contact form with validation
- Sends emails directly via EmailJS
- Required fields: name, email, message
- Optional: phone, subject, budget

### WhatsApp Integration  
- Floating WhatsApp button for quick chat
- Direct messaging to +91 8485939130
- Pre-filled message templates

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+

### 1. Clone & Install
```bash
git clone https://github.com/naitikmaisuriya/portfolio.git
cd portfolio
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your EmailJS credentials:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id  
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_WHATSAPP_NUMBER=918485939130
```

### 3. EmailJS Setup
1. Create account at [EmailJS.com](https://emailjs.com)
2. Create email service (Gmail, Outlook, etc.)
3. Create email template with these variables:
   - `{{from_name}}` - Sender name
   - `{{from_email}}` - Sender email  
   - `{{from_phone}}` - Sender phone
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{sent_time}}` - Timestamp
4. Copy Service ID, Template ID, and Public Key to `.env.local`

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio!

## 📝 Customization

### Personal Information
Update personal details in:
- `src/pages/Home.tsx` - Main hero section
- `src/pages/About.tsx` - About page content  
- `src/pages/Contact.tsx` - Contact information
- `public/sitemap.xml` - Your domain URLs

### Content Updates
- **Projects**: Edit `src/pages/Projects.tsx`
- **Skills**: Modify `src/pages/Skills.tsx`  
- **Experience**: Update `src/pages/Experience.tsx`
- **Services**: Customize `src/pages/Services.tsx`

### Styling & Theme
- **Colors**: Modify `tailwind.config.js`
- **Fonts**: Update Google Fonts in `index.html`
- **Components**: Edit files in `src/components/`

### Contact Configuration
- **Email**: Update EmailJS template and credentials
- **WhatsApp**: Change number in `.env.local`
- **Social Links**: Modify links in navigation components

## 🏗️ Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Push code to GitHub repository
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Deploy to Netlify  
1. Build the project: `npm run build`
2. Upload `dist` folder to [Netlify](https://netlify.com)
3. Configure environment variables
4. Enable form handling (optional)

## 📊 SEO Features

### Meta Tags
- Title, description, keywords for each page
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs

### Structured Data
- JSON-LD schema for Person/Developer
- Rich snippets for better search results
- Contact information markup

### Performance
- Lazy loading components
- Optimized images and assets
- Lighthouse score 90+

### Files
- `sitemap.xml` - Search engine sitemap
- `robots.txt` - Crawler instructions  
- `manifest.json` - PWA configuration

## 📞 Contact Information

- **Email**: naitikmaisuriya9@gmail.com
- **WhatsApp**: +91 8485939130  
- **GitHub**: https://github.com/naitikmaisuriya
- **LinkedIn**: https://linkedin.com/in/naitikmaisuriya

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Naitik Maisuriya**

> 💡 **Need help?** Open an issue or contact me directly via email or WhatsApp!

## ✨ Highlights

- 🚀 **Frontend-Only** - No backend needed, zero server costs
- 📱 **WhatsApp Integration** - Contact forms send directly to WhatsApp
- ⚡ **Lightning Fast** - Static site, global CDN
- 💰 **Free Hosting** - Deploy to Vercel/Netlify for $0/month
- 📧 **Email Backup** - Optional EmailJS integration
- 🎨 **Modern Design** - React + TypeScript + Tailwind CSS

---

## 🚀 Quick Start

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev

# 4. Open browser
# Visit: http://localhost:5173
```

**Test contact form:**
1. Go to `/contact` page
2. Fill out the form
3. Click "Send via WhatsApp"
4. WhatsApp opens with pre-filled message!

---

## 📚 Documentation

**New here? Read these in order:**

1. **[WHATSAPP_INTEGRATION.md](WHATSAPP_INTEGRATION.md)** - Quick overview (5 min)
2. **[QUICK_START.md](QUICK_START.md)** - Get started (2 min)
3. **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Deploy to production (15 min)

**All documentation:**
- [DOCS_INDEX.md](DOCS_INDEX.md) - Complete documentation index
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Full details
- [EMAILJS_SETUP_GUIDE.md](EMAILJS_SETUP_GUIDE.md) - Email backup setup (optional)
- [FRONTEND_CONVERSION_PLAN.md](FRONTEND_CONVERSION_PLAN.md) - Architecture

---

## 🎯 Features

### Contact Form
- ✅ WhatsApp integration (primary)
- ✅ Email backup via EmailJS (optional)
- ✅ Form validation
- ✅ Mobile responsive
- ✅ Instant submission

### Floating WhatsApp Button
- ✅ Always visible (bottom-right)
- ✅ One-click to chat
- ✅ Tooltip on first visit
- ✅ Works on all pages

### Design
- ✅ Modern, clean UI
- ✅ Dark/light mode support
- ✅ Smooth animations
- ✅ Fully responsive
- ✅ Accessibility features

---

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide Icons
- @emailjs/browser (email backup - optional)

### Integration
- WhatsApp Web API (wa.me) - Contact forms
- EmailJS (optional) - Email backup

---

## 📁 Project Structure

```
portfolio/
├── frontend/                    # React app
│   ├── src/
│   │   ├── components/
│   │   │   └── WhatsAppButton.tsx   # Floating chat button
│   │   ├── pages/
│   │   │   └── Contact.tsx          # Updated contact form
│   │   └── utils/
│   │       └── whatsapp.ts          # WhatsApp functions
│   └── .env.example             # Environment template
│
├── 📚 Documentation/
├── WHATSAPP_INTEGRATION.md      # ⭐ START HERE
├── QUICK_START.md               # Quick start guide
├── IMPLEMENTATION_SUMMARY.md    # Complete details
├── EMAILJS_SETUP_GUIDE.md       # Email setup (optional)
├── DEPLOYMENT_GUIDE.md          # Deploy to production
└── DOCS_INDEX.md                # Documentation index
```

---

## ⚡ Local Development

### Setup:

```bash
cd frontend
npm install
npm run dev
```

**Opens at:** http://localhost:5173

### Test Contact Form:

1. Go to http://localhost:5173/contact
2. Fill out the form
3. Click "Send via WhatsApp"
4. WhatsApp should open with pre-filled message

---

## 🚀 Production Deployment

### Quick Deploy (Vercel):

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel --prod
```

**Full guide:** Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

**Other options:**
- Netlify (drag & drop)
- GitHub Pages (100% free)
- Cloudflare Pages (fastest CDN)

---

## 🔧 Environment Variables

### Required:
```env
VITE_WHATSAPP_NUMBER=918485939130
```

### Optional (Email Backup):
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**See:** `frontend/.env.example` for template

---

## 📧 Contact Methods

### 1. Contact Form → WhatsApp (Primary)
User submits form → WhatsApp opens → Message pre-filled → You receive on +91 8485939130

### 2. Floating Chat Button
Always visible → One-click → Opens WhatsApp → Direct chat

### 3. Email Backup (Optional)
Same form → Email sent to naitikmaisuriya9@gmail.com → Via EmailJS

---

## 💰 Cost Breakdown

| Item | Cost |
|------|------|
| **Hosting** (Vercel/Netlify) | $0/month |
| **WhatsApp** | $0 (unlimited) |
| **EmailJS** (optional) | $0 (200/month free) |
| **Domain** (optional) | ~$12/year |
| **Total** | **$0/month** 🎉 |

---

## ✅ Features Checklist

- [x] Modern portfolio design
- [x] WhatsApp contact integration
- [x] Floating chat button
- [x] Email backup (optional)
- [x] Mobile responsive
- [x] Fast loading (<3s)
- [x] SEO optimized
- [x] Accessibility features
- [x] Dark/light mode support
- [x] Production ready

---

## 📊 Performance

- **Lighthouse Score:** 90+
- **First Contentful Paint:** <1s
- **Time to Interactive:** <2s
- **Bundle Size:** ~250KB (gzipped)

---

## 🧪 Testing

### Local Testing:
```bash
cd frontend
npm run dev
```

### Build Testing:
```bash
npm run build
npm run preview
```

### Production Testing:
- Contact form works
- WhatsApp opens correctly
- Floating button visible
- No console errors
- Mobile responsive

---

## 🆘 Troubleshooting

### WhatsApp not opening?
- Check browser allows popups
- Verify number: `918485939130`

### Form not submitting?
- Fill required fields
- Valid email format
- Check console errors

### Email not sending?
- EmailJS configured? (optional)
- `.env.local` exists?
- Dev server restarted?

**Full guide:** See troubleshooting sections in each doc

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [WhatsApp API](https://faq.whatsapp.com/general/wa-me)
- [EmailJS](https://www.emailjs.com)

---

## 👤 Contact

**Naitik Maisuriya**
- Email: naitikmaisuriya9@gmail.com
- WhatsApp: +91 8485939130
- Portfolio: [Your deployed URL]

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- React team for amazing framework
- Tailwind CSS for styling
- Vite for blazing fast builds
- EmailJS for email service
- Vercel/Netlify for free hosting

---

**🚀 Ready to deploy?** Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) and go live in minutes!

**⭐ If you found this helpful, please give it a star!**

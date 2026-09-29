import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/products';
import { 
  Palette, 
  Sparkles, 
  MessageCircle, 
  ShoppingBag, 
  Calendar, 
  Check, 
  HeartHandshake, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { Product } from '../types';

export const CustomOrderPage: React.FC = () => {
  const { addToCart, showToast } = useCart();

  // Custom Order Form state
  const [colorPalette, setColorPalette] = useState('Pastel Blush & Cream');
  const [customColorDetail, setCustomColorDetail] = useState('');
  const [sizeTier, setSizeTier] = useState<number>(6); // number of flowers
  const [flowerTypes, setFlowerTypes] = useState<string[]>(['Roses', 'Chamomile Daisies']);
  const [ribbonColor, setRibbonColor] = useState('Dusty Rose Satin');
  const [wrappingStyle, setWrappingStyle] = useState('Textured Korean Floral Paper');
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const paletteOptions = [
    { name: 'Pastel Blush & Cream', colors: ['#F7C5CC', '#FBF7F0', '#B9D1B8'] },
    { name: 'Warm Sunburst & Honey', colors: ['#F6BE3C', '#DE8B35', '#98AA90'] },
    { name: 'French Lavender Dream', colors: ['#CBB6E2', '#EFE6F7', '#A3B899'] },
    { name: 'Sage & Eucalyptus Garden', colors: ['#8A9A86', '#DEE5DD', '#FDFBF7'] },
    { name: 'Velvet Romance (Deep Wine)', colors: ['#872B3C', '#E28E9E', '#F7EDE9'] },
    { name: 'Custom Palette (Tell Us)', colors: ['#E0D4C3', '#C7B8A5', '#A89985'] },
  ];

  const sizeOptions = [
    { count: 3, label: 'Trio Petite (3 Blooms)', price: 32, desc: 'Sweet small token for birthdays or friendship' },
    { count: 6, label: 'Classic Harmony (6 Blooms)', price: 58, desc: 'Our most popular size, beautifully balanced' },
    { count: 9, label: 'Deluxe Celebration (9 Blooms)', price: 82, desc: 'Generous volume for graduations and anniversaries' },
    { count: 12, label: 'Grand Symphony (12 Blooms)', price: 110, desc: 'Opulent centerpiece arrangement for weddings or milestones' },
  ];

  const flowerOptions = [
    'Classic Roses',
    'Garden Tulips',
    'Sunny Sunflowers',
    'Chamomile Daisies',
    'Lavender Sprigs',
    'Lily of the Valley',
    'Eucalyptus Knitted Foliage',
    'Baby’s Breath Stems'
  ];

  const ribbonOptions = [
    'Dusty Rose Satin',
    'Sage Green Organza',
    'Cream Silk Ribbon',
    'Vintage Kraft Jute',
    'Soft Lilac Velvet',
  ];

  const currentSizeObj = sizeOptions.find((s) => s.count === sizeTier) || sizeOptions[1];
  const estimatedPrice = currentSizeObj.price;

  const toggleFlower = (flower: string) => {
    if (flowerTypes.includes(flower)) {
      if (flowerTypes.length > 1) {
        setFlowerTypes(flowerTypes.filter((f) => f !== flower));
      } else {
        showToast('Please keep at least one flower type chosen', 'info');
      }
    } else {
      if (flowerTypes.length < 5) {
        setFlowerTypes([...flowerTypes, flower]);
      } else {
        showToast('You can choose up to 5 flower varieties', 'info');
      }
    }
  };

  const handleAddToCart = () => {
    const bespokeProduct: Product = {
      id: `custom-bouquet-${Date.now()}`,
      name: `Custom Bouquet (${currentSizeObj.count} Stems)`,
      category: 'custom-gifts',
      categoryLabel: 'Custom Gifts',
      price: estimatedPrice,
      rating: 5.0,
      reviewCount: 1,
      shortDescription: `Custom ${colorPalette} bouquet with ${flowerTypes.join(', ')}.`,
      fullDescription: `Bespoke hand-crocheted arrangement tailored to customer instructions. Palette: ${colorPalette}. Ribbon: ${ribbonColor}. Wrapping: ${wrappingStyle}. Delivery Request: ${deliveryDate || 'Flexible'}.`,
      images: [
        '/src/assets/images/hero_crochet_bouquet_1790607605454.jpg',
      ],
      colors: [
        { name: colorPalette, hex: '#C86D7A' }
      ],
      material: '100% Combed Milk Cotton Yarn, wire floral stems, custom ribbons',
      inStock: true,
    };

    const notesSummary = `Custom Bouquet: ${colorPalette} | Flowers: ${flowerTypes.join(', ')} | Ribbon: ${ribbonColor} | Note: "${personalizedMessage || 'None'}"`;

    addToCart(bespokeProduct, colorPalette, 1, notesSummary, true);
    showToast('Custom bouquet added to bag! 🌸');
  };

  const handleWhatsAppCustomOrder = () => {
    let text = `*🌸 Custom Bouquet Request via ${SITE_CONFIG.name}*\n\n`;
    text += `Hello! I would like to order a bespoke handmade bouquet:\n\n`;
    text += `💐 *Size:* ${currentSizeObj.label} (${currentSizeObj.count} flowers)\n`;
    text += `🎨 *Palette:* ${colorPalette}${customColorDetail ? ` (${customColorDetail})` : ''}\n`;
    text += `🌸 *Flower Varieties:* ${flowerTypes.join(', ')}\n`;
    text += `🎀 *Ribbon / Wrapping:* ${ribbonColor} & ${wrappingStyle}\n`;
    if (personalizedMessage) {
      text += `💌 *Personal Note on Card:* "${personalizedMessage}"\n`;
    }
    if (deliveryDate) {
      text += `📅 *Target Delivery Date:* ${deliveryDate}\n`;
    }
    if (additionalRequirements) {
      text += `✨ *Special Requests:* ${additionalRequirements}\n`;
    }
    text += `\n💰 *Estimated Total:* ${SITE_CONFIG.currency}${estimatedPrice}\n`;
    if (customerName) {
      text += `👤 *My Name:* ${customerName} (${customerPhone || 'Via WhatsApp'})\n`;
    }
    text += `\nCould you please confirm the crafting timeline and payment details? Thank you! ✨`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Custom order submitted successfully! Our artisan will contact you shortly.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A66E78]">
          <Palette className="w-3.5 h-3.5 text-[#C86D7A]" />
          <span>Made-to-Order Atelier</span>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#2E2927]">
          Design Your Custom Bouquet
        </h1>
        <p className="text-sm text-[#736864] leading-relaxed">
          Select your loved one&apos;s favorite shades, flower species, and personal greeting. 
          Our artisan stitches every individual petal with tender care to create an everlasting memory.
        </p>
      </div>

      {submitted ? (
        <div className="max-w-xl mx-auto p-8 sm:p-12 bg-white rounded-3xl border border-[#EDE7E1] text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#EEF5ED] text-[#5C8A55] flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="font-display font-medium text-3xl text-[#2E2927]">
            Custom Order Request Received!
          </h2>
          <p className="text-xs text-[#6B615E] leading-relaxed">
            Thank you, <strong className="text-[#2E2927]">{customerName || 'Dear Customer'}</strong>! 
            We have received your custom bouquet specifications ({currentSizeObj.count} blooms in {colorPalette}). 
            Our master artisan will review your design and message you via WhatsApp or Email within 24 hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleWhatsAppCustomOrder}
              className="py-3 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Speed Up: Send to WhatsApp Now</span>
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="py-3 px-6 bg-[#FAF8F5] border border-[#D9CECE] text-[#523E3A] hover:bg-[#F2ECE6] rounded-xl text-xs font-semibold transition-colors"
            >
              Edit Configuration
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Customizer Form (7 Cols) */}
          <form onSubmit={handleSubmitForm} className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE7E1] shadow-2xs">
            
            {/* Step 1: Bouquet Color Palette */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#3D3533] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FCECEE] text-[#823846] text-[11px] font-bold flex items-center justify-center">1</span>
                  <span>Choose Bouquet Color Theme</span>
                </label>
                <span className="text-xs text-[#C86D7A] font-medium">{colorPalette}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paletteOptions.map((palette) => (
                  <button
                    key={palette.name}
                    type="button"
                    onClick={() => setColorPalette(palette.name)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                      colorPalette === palette.name
                        ? 'border-[#C86D7A] bg-[#FAF5F6] ring-1 ring-[#C86D7A]'
                        : 'border-[#EDE7E1] hover:border-[#C86D7A] bg-[#FAF8F5]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#2E2927]">{palette.name}</p>
                      <div className="flex gap-1.5 mt-2">
                        {palette.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                    {colorPalette === palette.name && (
                      <Check className="w-4 h-4 text-[#C86D7A]" />
                    )}
                  </button>
                ))}
              </div>

              {colorPalette.includes('Custom') && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={customColorDetail}
                    onChange={(e) => setCustomColorDetail(e.target.value)}
                    placeholder="Specify your exact shades (e.g. Sage green + dusty lilac + peach)"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5]"
                  />
                </div>
              )}
            </div>

            {/* Step 2: Number of Flowers (Size Tier) */}
            <div className="pt-6 border-t border-[#F2ECE6]">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#3D3533] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FCECEE] text-[#823846] text-[11px] font-bold flex items-center justify-center">2</span>
                  <span>Number of Flowers &amp; Arrangement Size</span>
                </label>
                <span className="text-xs font-bold text-[#2E2927]">
                  {SITE_CONFIG.currency}{estimatedPrice}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sizeOptions.map((opt) => (
                  <button
                    key={opt.count}
                    type="button"
                    onClick={() => setSizeTier(opt.count)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      sizeTier === opt.count
                        ? 'border-[#C86D7A] bg-[#FAF5F6] ring-1 ring-[#C86D7A]'
                        : 'border-[#EDE7E1] hover:border-[#C86D7A] bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#2E2927]">{opt.label}</p>
                      <span className="text-xs font-bold text-[#C86D7A]">
                        {SITE_CONFIG.currency}{opt.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7F7470] mt-1 leading-snug">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Flower Types */}
            <div className="pt-6 border-t border-[#F2ECE6]">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#3D3533] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FCECEE] text-[#823846] text-[11px] font-bold flex items-center justify-center">3</span>
                  <span>Select Flower Types (Pick up to 5)</span>
                </label>
                <span className="text-[11px] text-[#8C807C]">{flowerTypes.length} selected</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {flowerOptions.map((flower) => {
                  const selected = flowerTypes.includes(flower);
                  return (
                    <button
                      key={flower}
                      type="button"
                      onClick={() => toggleFlower(flower)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${
                        selected
                          ? 'border-[#C86D7A] bg-[#FCECEE] text-[#823846] font-semibold'
                          : 'border-[#EDE7E1] bg-[#FAF8F5] text-[#4A4240] hover:border-[#C86D7A]'
                      }`}
                    >
                      <span className="truncate">{flower}</span>
                      {selected && <Check className="w-3 h-3 text-[#C86D7A] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Ribbon & Packaging */}
            <div className="pt-6 border-t border-[#F2ECE6]">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#3D3533] flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#FCECEE] text-[#823846] text-[11px] font-bold flex items-center justify-center">4</span>
                <span>Ribbon &amp; Wrapping Style</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-[#7F7470] font-medium block mb-1">Ribbon Choice</span>
                  <select
                    value={ribbonColor}
                    onChange={(e) => setRibbonColor(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5]"
                  >
                    {ribbonOptions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-[11px] text-[#7F7470] font-medium block mb-1">Paper Wrapping</span>
                  <select
                    value={wrappingStyle}
                    onChange={(e) => setWrappingStyle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5]"
                  >
                    <option value="Textured Korean Floral Paper">Textured Korean Floral Paper</option>
                    <option value="Vintage Eco-Kraft Parchment">Vintage Eco-Kraft Parchment</option>
                    <option value="Translucent Frosted Veil">Translucent Frosted Veil</option>
                    <option value="Minimalist Ivory Paper">Minimalist Ivory Paper</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 5: Personalized Message & Delivery Date */}
            <div className="pt-6 border-t border-[#F2ECE6]">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#3D3533] flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#FCECEE] text-[#823846] text-[11px] font-bold flex items-center justify-center">5</span>
                <span>Greeting Note &amp; Delivery Timeline</span>
              </label>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] text-[#7F7470] font-medium mb-1">
                    Free Handwritten Gift Card Note
                  </label>
                  <textarea
                    rows={2}
                    value={personalizedMessage}
                    onChange={(e) => setPersonalizedMessage(e.target.value)}
                    placeholder="e.g. To my dearest Anna, congratulations on your graduation! So proud of you. Love always, Michael."
                    className="w-full text-xs p-3 rounded-xl border border-[#D9CECE] bg-[#FAF8F5] resize-none focus:outline-hidden focus:border-[#C86D7A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-[#7F7470] font-medium mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C86D7A]" />
                      <span>Target Delivery Date (Optional)</span>
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5] text-[#2E2927]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#7F7470] font-medium mb-1">
                      Additional Requirements
                    </label>
                    <input
                      type="text"
                      value={additionalRequirements}
                      onChange={(e) => setAdditionalRequirements(e.target.value)}
                      placeholder="e.g. Extra long stems, include mini bee charm"
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6: Customer Contact */}
            <div className="pt-6 border-t border-[#F2ECE6]">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#3D3533] flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#FCECEE] text-[#823846] text-[11px] font-bold flex items-center justify-center">6</span>
                <span>Your Contact Details</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name *"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="WhatsApp / Phone Number *"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5]"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 bg-[#C86D7A] hover:bg-[#B55D6A] text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                Submit Custom Order
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="py-3.5 px-5 bg-[#FAF8F5] border border-[#D9CECE] hover:bg-[#F2ECE6] text-[#523E3A] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#C86D7A]" />
                <span>Add to Bag</span>
              </button>
            </div>

          </form>

          {/* Right: Live Summary & Direct WhatsApp Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Live Bouquet Summary Card */}
            <div className="bg-white rounded-3xl border border-[#EDE7E1] p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE6]">
                <h3 className="font-display font-medium text-xl text-[#2E2927]">
                  Your Bouquet Configuration
                </h3>
                <span className="font-display font-bold text-xl text-[#C86D7A] tabular-nums">
                  {SITE_CONFIG.currency}{estimatedPrice}
                </span>
              </div>

              {/* Visual preview pill indicators */}
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EDE7E1] space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#7F7470]">Theme:</span>
                  <span className="font-semibold text-[#2E2927]">{colorPalette}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7F7470]">Volume:</span>
                  <span className="font-semibold text-[#2E2927]">{currentSizeObj.label}</span>
                </div>
                <div>
                  <span className="text-[#7F7470] block mb-1">Selected Blooms:</span>
                  <div className="flex flex-wrap gap-1">
                    {flowerTypes.map((f) => (
                      <span key={f} className="text-[11px] bg-white border border-[#E0D7D0] px-2 py-0.5 rounded-md text-[#4A4240]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7F7470]">Ribbon:</span>
                  <span className="font-medium text-[#2E2927]">{ribbonColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7F7470]">Wrapping:</span>
                  <span className="font-medium text-[#2E2927]">{wrappingStyle}</span>
                </div>
                {deliveryDate && (
                  <div className="flex justify-between text-[#8A9A86]">
                    <span>Target Date:</span>
                    <span className="font-medium">{deliveryDate}</span>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Order Button */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsAppCustomOrder}
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Custom Order via WhatsApp</span>
                </button>
                <p className="text-[11px] text-[#8C807C] text-center">
                  Chat directly with our artisan to confirm colors and photos before crafting.
                </p>
              </div>

              {/* Timeline Callout */}
              <div className="pt-4 border-t border-[#F2ECE6] text-xs text-[#6B615E] space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C86D7A] shrink-0" />
                  <span>Standard custom crafting time: <strong>3 – 5 days</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#8A9A86] shrink-0" />
                  <span>We send photo updates before dispatching</span>
                </div>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="bg-[#FAF5F0] p-5 rounded-2xl border border-[#EDE4DC] text-xs text-[#6B615E] flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#C86D7A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2E2927] block mb-1">Need a specialized wedding or corporate order?</strong>
                <p className="leading-relaxed">
                  We create bridal party bouquets, boutonnières, and bulk gift sets. Contact us via WhatsApp or at{' '}
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#C86D7A] underline">
                    {SITE_CONFIG.email}
                  </a>.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

(function() {
  const STORAGE_KEY = "ms_cart_v1";
  const WA_PRIMARY = "593981316871";
  const WA_ALT = "593939162587";

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch(e) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBadges();
  }

  function normalizeItem(item) {
    return {
      id: String(item.id || item.sku || item.name || Math.random()),
      type: item.type || "item",
      sku: item.sku || "",
      category: item.category || "",
      name: item.name || "",
      dimension: item.dimension || "",
      length: item.length || "",
      unit: item.unit || "",
      price: Number(item.price || 0),
      qty: Number(item.qty || 1),
      note: item.note || ""
    };
  }

  function addItem(item) {
    const it = normalizeItem(item);
    const cart = loadCart();
    const idx = cart.findIndex(x => x.id === it.id && x.note === it.note);
    if (idx >= 0) {
      cart[idx].qty = Number(cart[idx].qty) + Number(it.qty);
    } else {
      cart.push(it);
    }
    saveCart(cart);
    return cart;
  }

  function removeItem(id, note="") {
    const cart = loadCart().filter(x => !(x.id === id && x.note === note));
    saveCart(cart);
    return cart;
  }

  function updateQty(id, qty, note="") {
    const cart = loadCart();
    const idx = cart.findIndex(x => x.id === id && x.note === note);
    if (idx >= 0) {
      cart[idx].qty = Math.max(1, Number(qty)||1);
    }
    saveCart(cart);
    return cart;
  }

  function clearCart() {
    saveCart([]);
    return [];
  }

  function cartCount() {
    return loadCart().reduce((acc,it)=>acc + (Number(it.qty)||0), 0);
  }

  function cartTotal() {
    return loadCart().reduce((acc,it)=>acc + (Number(it.qty)||0) * (Number(it.price)||0), 0);
  }

  function money(n) {
    const v = Number(n)||0;
    return "$" + v.toFixed(2);
  }

  function whatsappMessage() {
    const items = loadCart();
    if (!items.length) return "Hola Maderas Salvador, quiero cotizar.\n\n(No tengo productos en el carrito todavía.)";
    const lines = [];
    lines.push("Hola Maderas Salvador, quiero cotizar/comprar lo siguiente:");
    lines.push("");
    items.forEach((it, i) => {
      const parts = [];
      if (it.sku) parts.push("SKU " + it.sku);
      if (it.category) parts.push(it.category);
      let title = it.name || it.dimension || "Producto";
      let meta = [];
      if (it.dimension) meta.push("Medida: " + it.dimension);
      if (it.length) meta.push("Largo: " + it.length);
      if (it.note) meta.push("Nota: " + it.note);
      const pricePart = it.price ? ("Precio: " + money(it.price)) : "Precio: Consultar";
      lines.push(`${i+1}) ${title}`);
      if (parts.length) lines.push("   " + parts.join(" • "));
      if (meta.length) meta.forEach(m => lines.push("   " + m));
      lines.push("   Cantidad: " + it.qty + (it.unit ? (" " + it.unit) : ""));
      lines.push("   " + pricePart);
      lines.push("");
    });
    const total = cartTotal();
    if (total > 0) {
      lines.push("Total referencial: " + money(total));
    } else {
      lines.push("Total: (por confirmar)");
    }
    lines.push("");
    lines.push("¿Me confirma disponibilidad, total final y envío a mi ciudad?");
    return lines.join("\n");
  }

  function openWhatsApp(useAlt=false) {
    const wa = useAlt ? WA_ALT : WA_PRIMARY;
    const url = "https://wa.me/" + wa + "?text=" + encodeURIComponent(whatsappMessage());
    window.open(url, "_blank");
  }

  function updateBadges() {
    const count = cartCount();
    document.querySelectorAll("#cartCountBadge, .cart-count").forEach(el => {
      el.textContent = String(count);
    });
  }

  // Expose
  window.MSCart = {
    loadCart, addItem, removeItem, updateQty, clearCart,
    cartCount, cartTotal, money,
    openWhatsApp, updateBadges
  };

  document.addEventListener("DOMContentLoaded", updateBadges);
})();

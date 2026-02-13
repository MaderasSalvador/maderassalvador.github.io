// CONTACTO GLOBAL — Maderas Salvador

const CONTACTO = {
  whatsappPrincipal: "593981316871",
  whatsappAlterno: "593939162587",
  instagram: "https://www.instagram.com/maderas_salvador",
  facebook: "https://www.facebook.com/share/1ARHZBvi1B/",
  pinterest: "https://www.pinterest.com/maderassalvador001/?actingBusinessId=1106407970864235135"
};

function aplicarContactos() {
  document.querySelectorAll(".wa-principal").forEach(btn => {
    btn.href = `https://wa.me/${CONTACTO.whatsappPrincipal}?text=Hola%20Maderas%20Salvador,%20quiero%20cotizar.`;
  });

  document.querySelectorAll(".wa-alterno").forEach(btn => {
    btn.href = `https://wa.me/${CONTACTO.whatsappAlterno}?text=Hola,%20necesito%20una%20cotizaci%C3%B3n%20r%C3%A1pida.`;
  });

  document.querySelectorAll(".instagram-link").forEach(btn => {
    btn.href = CONTACTO.instagram;
  });

  document.querySelectorAll(".facebook-link").forEach(btn => {
    btn.href = CONTACTO.facebook;
  });

  document.querySelectorAll(".pinterest-link").forEach(btn => {
    btn.href = CONTACTO.pinterest;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", aplicarContactos);
} else {
  aplicarContactos();
}
